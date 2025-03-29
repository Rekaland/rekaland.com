
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TableInfo, TableName } from "@/components/admin/publication/ConnectedTablesStatus";

export const useSupabaseConnection = (initialIsConnected?: boolean) => {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Belum pernah disinkronkan");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'pending'>(initialIsConnected ? 'connected' : 'pending');
  const [connectionInProgress, setConnectionInProgress] = useState(false);
  
  // Form state
  const [projectId, setProjectId] = useState("qnzmhgvpynokshnlbsiw");
  const [apiUrl, setApiUrl] = useState("https://qnzmhgvpynokshnlbsiw.supabase.co");
  const [apiKey, setApiKey] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuem1oZ3ZweW5va3Nobmxic2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNzI3NTUsImV4cCI6MjA1ODg0ODc1NX0.viIBr28yGeY9SaD9tYejkQ-5_Ihk69VygMYh6l-VThA");
  const [formErrors, setFormErrors] = useState({
    projectId: false,
    apiUrl: false,
    apiKey: false,
  });
  
  // Tables status
  const [tables, setTables] = useState<TableInfo[]>([
    { name: "properties", status: "pending" },
    { name: "profiles", status: "pending" },
    { name: "inquiries", status: "pending" }
  ]);
  
  // Periksa koneksi Supabase saat komponen dimuat
  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      // Gunakan properti yang pasti ada di tabel
      const { data, error } = await supabase.from('properties').select('id').limit(1);
      
      if (error) {
        console.error("Connection error:", error.message);
        setConnectionStatus('disconnected');
        throw error;
      }
      
      setConnectionStatus('connected');
      fetchTablesStatus();
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastSync(formattedDate);
    } catch (error) {
      console.error("Connection check failed:", error);
      setConnectionStatus('disconnected');
    }
  };
  
  const fetchTablesStatus = async () => {
    const updatedTables = [...tables];
    
    for (let i = 0; i < updatedTables.length; i++) {
      try {
        updatedTables[i].status = "checking";
        setTables([...updatedTables]);
        
        const tableName = updatedTables[i].name;
        let result;
        
        // Type-safe table query based on table name
        if (tableName === "properties") {
          result = await supabase.from("properties").select('id').limit(1);
        } else if (tableName === "profiles") {
          result = await supabase.from("profiles").select('id').limit(1);
        } else if (tableName === "inquiries") {
          result = await supabase.from("inquiries").select('id').limit(1);
        }
        
        if (result?.error) {
          updatedTables[i].status = "unavailable";
        } else {
          updatedTables[i].status = "available";
        }
      } catch (error) {
        updatedTables[i].status = "unavailable";
      }
    }
    
    setTables(updatedTables);
  };
  
  const handleConnect = async () => {
    // Validasi form
    const errors = {
      projectId: !projectId.trim(),
      apiUrl: !apiUrl.trim() || !apiUrl.includes('supabase.co'),
      apiKey: !apiKey.trim() || apiKey.length < 10,
    };
    
    setFormErrors(errors);
    
    if (errors.projectId || errors.apiUrl || errors.apiKey) {
      toast({
        title: "Validasi gagal",
        description: "Silakan periksa kembali informasi koneksi Supabase",
        variant: "destructive",
      });
      return;
    }
    
    setConnectionInProgress(true);
    
    toast({
      title: "Menghubungkan ke Supabase",
      description: "Sedang mencoba menghubungkan ke project Supabase Anda...",
      duration: 2000,
    });
    
    try {
      // Periksa koneksi Supabase
      await checkSupabaseConnection();
      
      if (connectionStatus !== 'connected') {
        throw new Error("Tidak dapat terhubung ke Supabase");
      }
      
      toast({
        title: "Koneksi berhasil",
        description: "Berhasil terhubung ke database Supabase",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (error) {
      console.error("Connection failed:", error);
      
      setConnectionStatus('disconnected');
      setTables(prev => prev.map(table => ({...table, status: "unavailable"})));
      
      toast({
        title: "Koneksi gagal",
        description: "Tidak dapat terhubung ke database Supabase. Periksa pengaturan koneksi.",
        variant: "destructive",
      });
    } finally {
      setConnectionInProgress(false);
    }
  };
  
  const handleSync = async () => {
    if (connectionStatus !== 'connected') {
      toast({
        title: "Koneksi tidak aktif",
        description: "Harap hubungkan ke Supabase terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSyncing(true);
    
    toast({
      title: "Sinkronisasi dimulai",
      description: "Sedang sinkronisasi dengan database Supabase",
      duration: 2000,
    });
    
    try {
      // Periksa kembali status tabel
      await fetchTablesStatus();
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      setLastSync(formattedDate);
      
      toast({
        title: "Sinkronisasi berhasil",
        description: "Data berhasil disinkronkan dengan Supabase",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (error) {
      console.error("Error during synchronization:", error);
      
      toast({
        title: "Sinkronisasi gagal",
        description: "Terjadi kesalahan saat sinkronisasi dengan Supabase",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  const handleTestConnection = async () => {
    try {
      toast({
        title: "Menguji koneksi",
        description: "Memeriksa koneksi ke Supabase",
        duration: 1000,
      });
      
      await checkSupabaseConnection();
      
      if (connectionStatus === 'connected') {
        toast({
          title: "Koneksi berhasil",
          description: "Berhasil terhubung ke database Supabase",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
      } else {
        throw new Error("Tidak dapat terhubung ke Supabase");
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      
      setConnectionStatus('disconnected');
      
      toast({
        title: "Koneksi gagal",
        description: "Tidak dapat terhubung ke database Supabase",
        variant: "destructive",
      });
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
    checkSupabaseConnection
  };
};
