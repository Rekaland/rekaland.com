
import { useEffect, useState, useCallback, useRef } from 'react';
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
  const channelRef = useRef<any>(null);
  
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
    
    // Create a stable channel name using the table name and a fixed suffix
    // This prevents creating multiple channels for the same table which causes flickering
    const channelName = `${table}-stable-channel`;
    
    // Prevent duplicate channel creation by removing any existing one
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }
    
    // Setup real-time subscription to table changes
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', subscriptionOptions, (payload) => {
        console.log(`Real-time update diterima untuk ${table}:`, payload);
        setLastEvent(payload);
        
        // Call callback if provided, with debounce to prevent excessive updates
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
      
    // Store the channel reference for cleanup
    channelRef.current = channel;

    // Cleanup subscription when component unmounts
    return () => {
      if (channelRef.current) {
        console.log(`Membersihkan subscription real-time untuk ${table}`);
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [table, onUpdate, specificFilters]);

  useEffect(() => {
    const cleanup = setupSubscription();
    
    // Implement a retry strategy with limited attempts
    let retryTimer: ReturnType<typeof setTimeout>;
    
    if (!isSubscribed && retryCount < 1) { // Limit retry attempts to reduce flickering
      const retryDelay = 3000; // Fixed delay of 3 seconds between retries
      console.log(`Akan mencoba ulang terhubung ke ${table} dalam ${retryDelay/1000} detik`);
      
      retryTimer = setTimeout(() => {
        console.log(`Mencoba ulang koneksi ke ${table} (attempt ${retryCount + 1})...`);
        setRetryCount(prev => prev + 1);
        setupSubscription();
      }, retryDelay);
    }
    
    return () => {
      cleanup();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [isSubscribed, retryCount, setupSubscription, table]);

  return { isSubscribed, lastEvent };
};
