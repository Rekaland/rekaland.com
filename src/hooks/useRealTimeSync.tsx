
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
        } else {
          setIsSubscribed(false);
        }
      });

    // Cleanup subscription saat komponen unmount
    return () => {
      console.log(`Membersihkan subscription real-time untuk ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, onUpdate, specificFilters, toast]);

  useEffect(() => {
    const cleanup = setupSubscription();
    
    // Mengurangi percobaan ulang yang berlebihan
    let retryTimer: ReturnType<typeof setTimeout>;
    
    if (!isSubscribed && retryCount < 2) { // Kurangi jumlah retry
      const retryDelay = 5000; // Delay tetap 5 detik
      console.log(`Akan mencoba ulang terhubung ke ${table} dalam ${retryDelay/1000} detik`);
      
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, retryDelay);
    }
    
    return () => {
      cleanup();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [isSubscribed, retryCount, setupSubscription, table]);

  return { isSubscribed, lastEvent };
};
