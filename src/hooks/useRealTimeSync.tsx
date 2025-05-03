
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
    
    // Create a stable channel name using the table name, without the timestamp
    // This prevents creating multiple channels for the same table which causes flickering
    const channelName = `${table}-changes-stable`;
    
    // Setup real-time subscription ke perubahan tabel
    const channel = supabase
      .channel(channelName)
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
  }, [table, onUpdate, specificFilters]);

  useEffect(() => {
    const cleanup = setupSubscription();
    
    // Limit retries to reduce flickering
    let retryTimer: ReturnType<typeof setTimeout>;
    
    if (!isSubscribed && retryCount < 1) { // Drastically reduce retry attempts
      const retryDelay = 3000; // Fixed delay of 3 seconds
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
