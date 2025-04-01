
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeSync = (tableName: string, onChange?: () => void) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Aktifkan real-time updates untuk tabel yang ditentukan
    const setupRealtime = async () => {
      try {
        // Aktifkan fitur real-time untuk tabel
        const channel = supabase
          .channel(`public:${tableName}`)
          .on('postgres_changes', 
              { event: '*', schema: 'public', table: tableName }, 
              (payload) => {
                console.log('Real-time update received:', payload);
                
                // Panggil callback onChange jika disediakan
                if (onChange) {
                  onChange();
                }
                
                // Tampilkan notifikasi perubahan
                const eventType = payload.eventType;
                
                let title = '';
                let description = '';
                
                switch (eventType) {
                  case 'INSERT':
                    title = 'Data baru ditambahkan';
                    description = `Data baru telah ditambahkan ke ${tableName}`;
                    break;
                  case 'UPDATE':
                    title = 'Data diperbarui';
                    description = `Data di ${tableName} telah diperbarui`;
                    break;
                  case 'DELETE':
                    title = 'Data dihapus';
                    description = `Data dari ${tableName} telah dihapus`;
                    break;
                }
                
                toast({
                  title,
                  description,
                  className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                });
              })
          .subscribe(status => {
            if (status === 'SUBSCRIBED') {
              console.log(`Real-time updates aktif untuk tabel ${tableName}`);
              setIsSubscribed(true);
            }
          });
          
        return () => {
          supabase.removeChannel(channel);
          setIsSubscribed(false);
        };
      } catch (error) {
        console.error(`Error setting up real-time for ${tableName}:`, error);
      }
    };
    
    setupRealtime();
  }, [tableName, onChange, toast]);
  
  return { isSubscribed };
};
