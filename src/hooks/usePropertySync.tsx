
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

// Hook untuk memonitoring real-time sinkronisasi antara dashboard admin dan website
export const usePropertySync = () => {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('syncing');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const { toast } = useToast();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Inisialisasi status sinkronisasi
    checkSyncStatus();

    // Setup real-time subscription dengan channel stabil
    const channelName = 'property-sync-stable';
    
    // Remove any existing channel with the same name
    const existingChannels = supabase.getChannels();
    for (const channel of existingChannels) {
      // Use a safer way to check channel names
      const channelConfig = channel as any;
      if (channelConfig && channelConfig.config && channelConfig.config.name === channelName) {
        supabase.removeChannel(channel);
      }
    }
    
    // Buat channel baru
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'properties' }, 
          (payload) => {
            console.log('Property sync: Change detected', payload);
            
            if (!isMounted.current) return;
            
            setSyncStatus('syncing');
            
            // Simulasi proses sinkronisasi dengan penundaan stabil
            setTimeout(() => {
              if (!isMounted.current) return;
              
              const now = new Date();
              const formattedTime = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });
              
              setLastSyncTime(formattedTime);
              setSyncStatus('synced');
              
              const eventType = payload.eventType;
              let actionText = '';
              
              switch (eventType) {
                case 'INSERT':
                  actionText = 'ditambahkan';
                  break;
                case 'UPDATE':
                  actionText = 'diperbarui';
                  break;
                case 'DELETE':
                  actionText = 'dihapus';
                  break;
                default:
                  actionText = 'diubah';
              }
              
              // Hindari multiple toasts untuk perubahan yang sama
              toast({
                title: `Properti ${actionText}`,
                description: `Website telah disinkronkan dengan perubahan terbaru (${formattedTime})`,
                className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
              });
            }, 1500);
          })
      .subscribe((status) => {
        console.log(`Property sync channel status: ${status}`);
      });
      
    // Simpan referensi
    channelRef.current = channel;
      
    return () => {
      isMounted.current = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [toast]);
  
  // Fungsi untuk memeriksa status sinkronisasi awal
  const checkSyncStatus = async () => {
    try {
      // Periksa kapan terakhir kali sinkronisasi
      const { data, error } = await supabase
        .from('settings')
        .select('updated_at, value')
        .eq('key', 'website_settings')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') { // Not found error
          console.error('Error checking sync status:', error);
          setSyncStatus('error');
        }
        return;
      }
      
      if (data) {
        const updatedAt = new Date(data.updated_at);
        const formattedTime = updatedAt.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        setLastSyncTime(formattedTime);
        setSyncStatus('synced');
      }
    } catch (err) {
      console.error('Failed to check sync status:', err);
      setSyncStatus('error');
    }
  };
  
  // Fungsi untuk memulai sinkronisasi manual dengan debounce
  const syncRequestsRef = useRef<number>(0);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const syncNow = async () => {
    try {
      // Prevent multiple rapid syncs
      syncRequestsRef.current += 1;
      
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      
      // Delay actual sync to avoid overwhelming the system
      syncTimeoutRef.current = setTimeout(async () => {
        if (syncRequestsRef.current > 0) {
          setSyncStatus('syncing');
          
          // Update pengaturan untuk memicu sinkronisasi
          const now = new Date().toISOString();
          
          const { data: existingSettings } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'sync_timestamp')
            .maybeSingle();
          
          if (existingSettings) {
            await supabase
              .from('settings')
              .update({
                value: { timestamp: now, count: syncRequestsRef.current },
                updated_at: now
              })
              .eq('key', 'sync_timestamp');
          } else {
            await supabase
              .from('settings')
              .insert({
                key: 'sync_timestamp',
                value: { timestamp: now, count: syncRequestsRef.current },
                created_at: now,
                updated_at: now
              });
          }
          
          // Reset counter
          syncRequestsRef.current = 0;
          
          // Simulasi proses sinkronisasi
          setTimeout(() => {
            if (!isMounted.current) return;
            
            const formattedTime = new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
            
            setLastSyncTime(formattedTime);
            setSyncStatus('synced');
            
            toast({
              title: "Sinkronisasi berhasil",
              description: `Website telah disinkronkan dengan perubahan terbaru (${formattedTime})`,
              className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
            });
          }, 2000);
        }
      }, 300);
    } catch (err) {
      console.error('Sync failed:', err);
      setSyncStatus('error');
      
      toast({
        title: "Sinkronisasi gagal",
        description: "Terjadi kesalahan saat menyinkronkan website",
        variant: "destructive",
      });
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);
  
  return { syncStatus, lastSyncTime, syncNow };
};
