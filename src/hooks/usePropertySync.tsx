
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

// Hook untuk memonitoring real-time sinkronisasi antara dashboard admin dan website
export const usePropertySync = () => {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('syncing');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Inisialisasi status sinkronisasi
    checkSyncStatus();

    // Setup real-time subscription ke perubahan properti
    const channel = supabase
      .channel('property-sync')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'properties' }, 
          (payload) => {
            console.log('Property sync: Change detected', payload);
            
            setSyncStatus('syncing');
            
            // Simulasi proses sinkronisasi
            setTimeout(() => {
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
              }
              
              toast({
                title: `Properti ${actionText}`,
                description: `Website telah disinkronkan dengan perubahan terbaru (${formattedTime})`,
                className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
              });
            }, 1500);
          })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
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
  
  // Fungsi untuk memulai sinkronisasi manual
  const syncNow = async () => {
    try {
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
            value: { timestamp: now },
            updated_at: now
          })
          .eq('key', 'sync_timestamp');
      } else {
        await supabase
          .from('settings')
          .insert({
            key: 'sync_timestamp',
            value: { timestamp: now },
            created_at: now,
            updated_at: now
          });
      }
      
      // Simulasi proses sinkronisasi
      setTimeout(() => {
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
  
  return { syncStatus, lastSyncTime, syncNow };
};
