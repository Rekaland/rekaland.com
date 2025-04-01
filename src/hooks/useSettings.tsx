
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useSettings = (key: string) => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const { toast } = useToast();

  const loadSettings = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('settings')
        .select('value, updated_at')
        .eq('key', key)
        .maybeSingle();
      
      if (error) {
        if (error.code !== 'PGRST116') { // Ignore "not found" errors
          console.error('Error fetching settings:', error);
          throw error;
        }
      }
      
      if (data) {
        setSettings(data.value);
        
        if (data.updated_at) {
          const updatedAt = new Date(data.updated_at);
          const formattedTime = updatedAt.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          });
          setLastSaved(formattedTime);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch settings:', err);
      setError(err.message);
      
      toast({
        title: "Gagal memuat pengaturan",
        description: "Terjadi kesalahan saat mengambil data dari server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [key]);

  const saveSettings = async (newSettings: any) => {
    try {
      const now = new Date();
      
      // Check if settings already exist
      const { data: existingData, error: fetchError } = await supabase
        .from('settings')
        .select('id')
        .eq('key', key)
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      let result;
      
      if (existingData) {
        // Update existing settings
        result = await supabase
          .from('settings')
          .update({
            value: newSettings,
            updated_at: now.toISOString()
          })
          .eq('key', key);
      } else {
        // Insert new settings
        result = await supabase
          .from('settings')
          .insert({
            key: key,
            value: newSettings,
            updated_at: now.toISOString()
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      const formattedTime = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      setSettings(newSettings);
      setLastSaved(formattedTime);
      
      toast({
        title: "Pengaturan tersimpan!",
        description: "Perubahan pada pengaturan berhasil disimpan ke database",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
      
      return { success: true, lastSaved: formattedTime };
    } catch (err: any) {
      console.error('Error saving settings:', err);
      
      toast({
        title: "Gagal menyimpan pengaturan",
        description: err.message || "Terjadi kesalahan saat menyimpan pengaturan",
        variant: "destructive",
        duration: 5000,
      });
      
      return { success: false, error: err.message };
    }
  };

  return { 
    settings, 
    setSettings,
    loading, 
    error, 
    lastSaved,
    loadSettings,
    saveSettings
  };
};
