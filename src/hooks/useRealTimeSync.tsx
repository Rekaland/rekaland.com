
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRealTimeSync = (
  table: string,
  onUpdate?: () => void,
  specificFilters?: { column: string, value: any }[]
) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [lastEvent, setLastEvent] = useState<any>(null);

  useEffect(() => {
    console.log(`Real-time updates aktif untuk tabel ${table}`);

    // Setup real-time subscription ke perubahan tabel
    const channel = supabase
      .channel(`${table}-changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table 
        }, 
        (payload) => {
          console.log(`Real-time update received for ${table}:`, payload);
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
        } else {
          setIsSubscribed(false);
        }
      });

    // Cleanup subscription saat komponen unmount
    return () => {
      console.log(`Cleaning up real-time subscription for ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, onUpdate]);

  return { isSubscribed, lastEvent };
};
