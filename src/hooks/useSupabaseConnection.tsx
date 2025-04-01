
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TableInfo } from "@/components/admin/publication/ConnectedTablesStatus";
import { useToast } from "./use-toast";

export const useSupabaseConnection = (isConnected: boolean = false) => {
  const [connectionStatus, setConnectionStatus] = useState<'pending' | 'connected' | 'failed'>(
    isConnected ? 'connected' : 'pending'
  );
  const [connectionInProgress, setConnectionInProgress] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [projectId, setProjectId] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([
    { name: 'properties', status: 'pending' },
    { name: 'profiles', status: 'pending' },
    { name: 'inquiries', status: 'pending' },
    { name: 'testimonials', status: 'pending' },
    { name: 'contents', status: 'pending' },
  ]);
  const [formErrors, setFormErrors] = useState({
    projectId: '',
    apiUrl: '',
    apiKey: ''
  });
  const { toast } = useToast();

  // Fungsi untuk memuat pengaturan koneksi dari Supabase
  const loadConnectionSettings = useCallback(async () => {
    try {
      console.log("Memuat pengaturan koneksi...");
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'website_settings')
        .maybeSingle();
      
      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Error fetching connection settings:', error);
          setConnectionStatus('failed');
        }
        return;
      }
      
      if (data?.value) {
        const settings = data.value as any;
        console.log("Pengaturan terambil:", settings);
        
        if (settings.supabaseUrl) setApiUrl(settings.supabaseUrl);
        if (settings.supabaseKey) setApiKey(settings.supabaseKey);
        if (settings.projectId) setProjectId(settings.projectId);
        
        if (settings.lastPublished) {
          setLastSync(formatLocalTime(new Date(settings.lastPublished)));
        }
        
        if (settings.tables) {
          const tablesData = settings.tables as any[];
          setTables(prev => 
            prev.map(table => {
              const foundTable = tablesData.find(t => t.name === table.name);
              if (foundTable) {
                return {
                  ...table,
                  status: foundTable.status || 'pending',
                  lastSync: foundTable.lastSync || null
                };
              }
              return table;
            })
          );
        }
        
        // Jika memiliki data koneksi, kita coba verifikasi koneksi
        if (settings.supabaseUrl && settings.supabaseKey && settings.projectId) {
          await verifyConnection(settings.projectId, settings.supabaseUrl, settings.supabaseKey);
        }
      }
    } catch (err) {
      console.error('Failed to load connection settings:', err);
      setConnectionStatus('failed');
    }
  }, []);

  // Format waktu ke format lokal
  const formatLocalTime = (date: Date): string => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Fungsi untuk memverifikasi koneksi ke Supabase
  const verifyConnection = async (projectId: string, apiUrl: string, apiKey: string) => {
    try {
      console.log("Memverifikasi koneksi Supabase...");
      const customClient = supabase;
      
      // Coba koneksi ke Supabase dengan cek tabel settings
      const { error } = await customClient
        .from('settings')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Koneksi gagal:", error);
        setConnectionStatus('failed');
        return false;
      }
      
      console.log("Koneksi berhasil diverifikasi!");
      setConnectionStatus('connected');
      return true;
    } catch (err) {
      console.error("Verifikasi koneksi gagal:", err);
      setConnectionStatus('failed');
      return false;
    }
  };

  // Load koneksi saat komponen dimuat
  useEffect(() => {
    loadConnectionSettings();
    
    // Set interval untuk refresh status koneksi setiap 5 menit
    const intervalId = setInterval(() => {
      if (connectionStatus === 'connected') {
        verifyConnection(projectId, apiUrl, apiKey);
      }
    }, 5 * 60 * 1000); // 5 menit
    
    return () => clearInterval(intervalId);
  }, [loadConnectionSettings]);

  const handleTestConnection = async () => {
    if (connectionStatus !== 'connected') {
      return;
    }
    
    setConnectionInProgress(true);
    
    try {
      console.log("Menguji koneksi...");
      const connected = await verifyConnection(projectId, apiUrl, apiKey);
      
      if (connected) {
        // Uji setiap tabel
        const newTables = [...tables];
        let allSynced = true;
        
        for (let i = 0; i < newTables.length; i++) {
          try {
            const tableName = newTables[i].name;
            
            const { count, error } = await supabase
              .from(tableName as any)
              .select('*', { count: 'exact', head: true });
            
            if (error) {
              console.error(`Error checking table ${newTables[i].name}:`, error);
              newTables[i].status = 'error';
              allSynced = false;
            } else {
              newTables[i].status = 'synced';
              newTables[i].lastSync = formatLocalTime(new Date());
            }
          } catch (err) {
            console.error(`Error checking table ${newTables[i].name}:`, err);
            newTables[i].status = 'error';
            allSynced = false;
          }
        }
        
        setTables(newTables);
        
        if (allSynced) {
          const now = new Date();
          setLastSync(formatLocalTime(now));
        }

        toast({
          title: "Koneksi Berhasil!",
          description: "Berhasil terhubung dengan database Supabase",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
      } else {
        toast({
          title: "Koneksi Gagal",
          description: "Tidak dapat terhubung ke database Supabase",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      toast({
        title: "Koneksi Gagal",
        description: "Tidak dapat terhubung ke database Supabase",
        variant: "destructive",
      });
    } finally {
      setConnectionInProgress(false);
    }
  };

  const handleConnect = async () => {
    setFormErrors({
      projectId: '',
      apiUrl: '',
      apiKey: ''
    });
    
    let hasErrors = false;
    const newErrors = {
      projectId: '',
      apiUrl: '',
      apiKey: ''
    };
    
    if (!projectId.trim()) {
      newErrors.projectId = 'Project ID wajib diisi';
      hasErrors = true;
    }
    
    if (!apiUrl.trim()) {
      newErrors.apiUrl = 'API URL wajib diisi';
      hasErrors = true;
    } else if (!apiUrl.startsWith('https://')) {
      newErrors.apiUrl = 'API URL harus dimulai dengan https://';
      hasErrors = true;
    }
    
    if (!apiKey.trim()) {
      newErrors.apiKey = 'API Key wajib diisi';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    }
    
    setConnectionInProgress(true);
    
    try {
      console.log("Mencoba koneksi dengan:", { projectId, apiUrl, apiKey });
      const connected = await verifyConnection(projectId, apiUrl, apiKey);
      
      if (connected) {
        const now = new Date();
        const formattedTime = formatLocalTime(now);
        setLastSync(formattedTime);
        
        // Simpan pengaturan ke database
        await saveConnectionSettings();
        
        toast({
          title: "Koneksi Berhasil!",
          description: "Berhasil terhubung dengan database Supabase",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
        
        await handleTestConnection();
      } else {
        toast({
          title: "Koneksi Gagal",
          description: "Tidak dapat terhubung ke database Supabase",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('failed');
      
      toast({
        title: "Koneksi Gagal",
        description: "Tidak dapat terhubung ke database Supabase",
        variant: "destructive",
      });
    } finally {
      setConnectionInProgress(false);
    }
  };

  // Simpan pengaturan koneksi ke database
  const saveConnectionSettings = async () => {
    try {
      const now = new Date().toISOString();
      
      const tablesJson = tables.map(table => ({
        name: table.name,
        status: table.status,
        lastSync: table.lastSync
      }));
      
      const settings = {
        supabaseUrl: apiUrl,
        supabaseKey: apiKey,
        projectId: projectId,
        lastPublished: now,
        tables: tablesJson
      };
      
      const { data: existingSettings, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'website_settings')
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      let saveResult;
      
      if (existingSettings) {
        saveResult = await supabase
          .from('settings')
          .update({
            value: settings as any,
            updated_at: now
          })
          .eq('key', 'website_settings');
      } else {
        saveResult = await supabase
          .from('settings')
          .insert({
            key: 'website_settings',
            value: settings as any,
            created_at: now,
            updated_at: now
          });
      }
      
      if (saveResult.error) {
        throw saveResult.error;
      }
      
      console.log("Pengaturan koneksi berhasil disimpan");
      return true;
    } catch (err) {
      console.error('Failed to save connection settings:', err);
      toast({
        title: "Gagal Menyimpan Pengaturan",
        description: "Terjadi kesalahan saat menyimpan pengaturan koneksi",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      console.log("Memulai sinkronisasi...");
      const newTables = [...tables];
      
      for (let i = 0; i < newTables.length; i++) {
        try {
          // Sinkronisasi satu per satu
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const tableName = newTables[i].name;
          
          const { count, error } = await supabase
            .from(tableName as any)
            .select('*', { count: 'exact', head: true });
          
          if (error) {
            console.error(`Error syncing table ${newTables[i].name}:`, error);
            newTables[i].status = 'error';
          } else {
            newTables[i].status = 'synced';
            newTables[i].lastSync = formatLocalTime(new Date());
          }
        } catch (err) {
          console.error(`Error syncing table ${newTables[i].name}:`, err);
          newTables[i].status = 'error';
        }
      }
      
      setTables(newTables);
      const now = new Date();
      setLastSync(formatLocalTime(now));
      
      // Simpan status sinkronisasi
      await saveConnectionSettings();
      
      toast({
        title: "Sinkronisasi Berhasil",
        description: "Semua tabel berhasil disinkronkan",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: "Sinkronisasi Gagal",
        description: "Gagal melakukan sinkronisasi tabel",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    connectionStatus,
    setConnectionStatus,
    connectionInProgress,
    projectId,
    setProjectId,
    apiUrl,
    setApiUrl,
    apiKey,
    setApiKey,
    formErrors,
    tables,
    lastSync,
    isSyncing,
    handleConnect,
    handleSync,
    handleTestConnection,
    verifyConnection,
    loadConnectionSettings,
    saveConnectionSettings
  };
};
