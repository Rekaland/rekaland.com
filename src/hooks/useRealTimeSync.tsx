
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
  const { toast } = useToast();
  
  // Use refs to maintain stable channel references
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const tableRef = useRef(table);
  const onUpdateRef = useRef(onUpdate);
  const filtersRef = useRef(specificFilters);
  
  // Update refs when dependencies change
  useEffect(() => {
    tableRef.current = table;
    onUpdateRef.current = onUpdate;
    filtersRef.current = specificFilters;
  }, [table, onUpdate, specificFilters]);
  
  // Function to create and manage the subscription channel
  const setupSubscription = useCallback(() => {
    if (channelRef.current) {
      console.log(`Removing existing channel for ${tableRef.current}`);
      supabase.removeChannel(channelRef.current);
    }
    
    console.log(`Setting up real-time updates for table ${tableRef.current}`);
    
    // Setup object to hold subscription options
    const subscriptionOptions: any = {
      event: '*', 
      schema: 'public', 
      table: tableRef.current
    };
    
    // Add filters if provided
    if (filtersRef.current && filtersRef.current.length > 0) {
      subscriptionOptions.filter = filtersRef.current.reduce((obj, filter) => {
        obj[filter.column] = filter.value;
        return obj;
      }, {} as Record<string, any>);
    }
    
    // Create a stable channel name using the table name
    const channelName = `${tableRef.current}-changes-stable`;
    
    // Setup real-time subscription
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', subscriptionOptions, (payload) => {
        console.log(`Real-time update received for ${tableRef.current}:`, payload);
        setLastEvent(payload);
        
        // Call callback if provided
        if (onUpdateRef.current) {
          onUpdateRef.current();
        }
      })
      .subscribe((status) => {
        console.log(`Real-time sync status for ${tableRef.current}:`, status);
        if (status === 'SUBSCRIBED') {
          setIsSubscribed(true);
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Channel error for ${tableRef.current}`);
          setIsSubscribed(false);
        } else if (status === 'TIMED_OUT') {
          console.error(`Connection timed out for ${tableRef.current}`);
          setIsSubscribed(false);
        } else if (status === 'CLOSED') {
          console.log(`Channel closed for ${tableRef.current}`);
          setIsSubscribed(false);
        }
      });
      
    channelRef.current = channel;
    
    // Return cleanup function
    return () => {
      console.log(`Cleaning up real-time subscription for ${tableRef.current}`);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);

  // Setup subscription once and handle reconnection if needed
  useEffect(() => {
    const cleanup = setupSubscription();
    
    // Implement a more resilient connection mechanism
    const handleOnlineStatus = () => {
      if (navigator.onLine && !isSubscribed && channelRef.current === null) {
        console.log(`Device back online, reconnecting to ${tableRef.current}`);
        setupSubscription();
      }
    };
    
    // Listen for online/offline events
    window.addEventListener('online', handleOnlineStatus);
    
    return () => {
      cleanup();
      window.removeEventListener('online', handleOnlineStatus);
    };
  }, [setupSubscription, isSubscribed]);

  return { isSubscribed, lastEvent };
};
