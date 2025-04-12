
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface RealTimeSyncResult {
  isSubscribed: boolean;
  lastEvent: any;
}

export const useRealTimeSync = (
  table: string,
  onUpdate?: () => void,
  specificFilters?: { column: string, value: any }[]
): RealTimeSyncResult => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [lastEvent, setLastEvent] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  
  // Function to create and manage the subscription channel
  const setupSubscription = useCallback(() => {
    console.log(`Setting up real-time updates untuk tabel ${table}`);
    
    // Setup object to hold subscription options
    const subscriptionOptions: any = {
      event: '*', 
      schema: 'public', 
      table
    };
    
    // Add filters if provided
    if (specificFilters && specificFilters.length > 0) {
      subscriptionOptions.filter = specificFilters.reduce((obj, filter) => {
        obj[filter.column] = filter.value;
        return obj;
      }, {} as Record<string, any>);
    }
    
    // Setup real-time subscription ke perubahan tabel
    const channel = supabase
      .channel(`${table}-changes-${Date.now()}`)
      .on('postgres_changes', subscriptionOptions, (payload) => {
        console.log(`Real-time update diterima untuk ${table}:`, payload);
        setLastEvent(payload);
        
        // Panggil callback jika disediakan
        if (onUpdate) {
          onUpdate();
        }
      })
      .subscribe((status) => {
        console.log(`Real-time sync status for ${table}:`, status);
        if (status === 'SUBSCRIBED') {
          setIsSubscribed(true);
          setRetryCount(0); // Reset retry count on successful subscription
          
          if (retryCount > 0) {
            toast({
              title: "Koneksi berhasil",
              description: `Tabel ${table} berhasil terhubung secara real-time`,
              className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
            });
          }
        } else {
          setIsSubscribed(false);
          
          // Only show errors after several retries to avoid spamming
          if (retryCount > 3) {
            console.error(`Gagal tersambung ke tabel ${table} setelah ${retryCount} percobaan`);
          }
        }
      });

    // Cleanup subscription saat komponen unmount
    return () => {
      console.log(`Membersihkan subscription real-time untuk ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, onUpdate, specificFilters, retryCount, toast]);

  useEffect(() => {
    const cleanup = setupSubscription();
    
    // Retry setup if not subscribed, with increasing delay
    let retryTimer: ReturnType<typeof setTimeout>;
    
    if (!isSubscribed && retryCount < 5) {
      const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff up to 30s
      console.log(`Akan mencoba ulang terhubung ke ${table} dalam ${retryDelay/1000} detik`);
      
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        cleanup(); // Clean up previous subscription attempt
        setupSubscription(); // Try again
      }, retryDelay);
    }
    
    return () => {
      cleanup();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [isSubscribed, retryCount, setupSubscription, table]);

  // Function to force a refresh of the subscription
  const refreshSubscription = useCallback(() => {
    setRetryCount(0); // Reset retry count
    return setupSubscription();
  }, [setupSubscription]);

  return { isSubscribed, lastEvent };
};
