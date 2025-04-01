
import { useState, useEffect, useCallback } from "react";
import { Database, Eye, FileText, RefreshCw, Check, X, Save, Globe, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSupabaseConnection } from "@/hooks/useSupabaseConnection";
import ConnectionStatus from "./ConnectionStatus";
import ConnectionForm from "./ConnectionForm";
import ConnectedDetails from "./ConnectedDetails";
import ConnectionHelp from "./ConnectionHelp";
import { supabase } from "@/integrations/supabase/client";
import { TableInfo } from "./ConnectedTablesStatus";

interface SupabaseConnectionProps {
  onPublish?: () => void;
  onConnectionChange?: (connected: boolean) => void;
  isConnected?: boolean;
}

const SupabaseConnection = ({ onPublish, onConnectionChange, isConnected: initialIsConnected }: SupabaseConnectionProps) => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [publicationInProgress, setPublicationInProgress] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  
  const {
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
    loadConnectionSettings,
    verifyConnection
  } = useSupabaseConnection(initialIsConnected);
  
  // Efek untuk memantau status koneksi dan memberitahu komponen parent
  useEffect(() => {
    if (onConnectionChange) {
      onConnectionChange(connectionStatus === 'connected');
    }
  }, [connectionStatus, onConnectionChange]);

  // Efek untuk mencoba ulang koneksi setiap 15 detik jika gagal
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (connectionStatus === 'failed' && projectId && apiUrl && apiKey) {
      intervalId = setInterval(() => {
        console.log("Mencoba koneksi ulang...");
        setReconnectAttempt(prev => prev + 1);
        verifyConnection(projectId, apiUrl, apiKey);
      }, 15000); // 15 detik
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [connectionStatus, projectId, apiUrl, apiKey, verifyConnection]);

  // Efek untuk memuat ulang pengaturan koneksi saat komponen dimuat
  useEffect(() => {
    // Muat ulang pengaturan saat halaman dimuat
    loadConnectionSettings();
    
    // Set interval untuk refresh status koneksi setiap 1 menit
    const checkInterval = setInterval(() => {
      loadConnectionSettings();
    }, 60000); // 1 menit
    
    return () => clearInterval(checkInterval);
  }, [loadConnectionSettings]);

  const handleActualPublish = async () => {
    if (connectionStatus !== 'connected') {
      toast({
        title: "Koneksi tidak aktif",
        description: "Harap hubungkan ke Supabase terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setPublicationInProgress(true);
      
      toast({
        title: "Publikasi dimulai",
        description: "Sedang mempublikasikan data ke Supabase...",
        duration: 2000,
      });
      
      const now = new Date();
      const nowISO = now.toISOString();
      
      const { data: existingSettings, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'website_settings')
        .maybeSingle();
      
      let saveResult;
      
      const tablesJson = tables.map(table => ({
        name: table.name,
        status: table.status,
        lastSync: table.lastSync
      }));
      
      const settingsObject = {
        supabaseUrl: apiUrl,
        supabaseKey: apiKey,
        projectId: projectId,
        lastPublished: nowISO,
        tables: tablesJson
      };
      
      if (existingSettings) {
        saveResult = await supabase
          .from('settings')
          .update({
            value: settingsObject as any,
            updated_at: nowISO
          })
          .eq('key', 'website_settings');
      } else {
        saveResult = await supabase
          .from('settings')
          .insert({
            key: 'website_settings',
            value: settingsObject as any,
            created_at: nowISO,
            updated_at: nowISO
          });
      }
      
      if (saveResult && saveResult.error) {
        throw new Error(saveResult.error.message);
      }
      
      // Catat ke riwayat deployment
      const newDeployment = {
        id: Date.now(),
        timestamp: nowISO,
        status: "success",
        environment: "production",
        changes: "Update konten website dan integrasi database"
      };
      
      // Ambil riwayat deployment yang ada
      const { data: historyData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'deployment_history')
        .maybeSingle();
      
      let deploymentHistory = [];
      if (historyData?.value) {
        // Pastikan ini array
        if (Array.isArray(historyData.value)) {
          deploymentHistory = historyData.value;
        } else {
          // Jika bukan array, coba parse atau buat array baru
          try {
            deploymentHistory = JSON.parse(historyData.value as any);
            if (!Array.isArray(deploymentHistory)) {
              deploymentHistory = [];
            }
          } catch (e) {
            deploymentHistory = [];
          }
        }
      }
      
      // Tambahkan deployment baru ke awal array
      deploymentHistory.unshift(newDeployment);
      
      // Batasi jumlah riwayat
      if (deploymentHistory.length > 10) {
        deploymentHistory = deploymentHistory.slice(0, 10);
      }
      
      // Simpan riwayat deployment
      await supabase
        .from('settings')
        .upsert({
          key: 'deployment_history',
          value: deploymentHistory as any,
          updated_at: nowISO
        });
      
      setTimeout(() => {
        setPublicationInProgress(false);
        
        toast({
          title: "Publikasi berhasil!",
          description: "Data berhasil dipublikasikan ke Supabase",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
        
        if (onPublish) {
          onPublish();
        }
      }, 2000);
    } catch (error: any) {
      console.error("Error during publication:", error);
      setPublicationInProgress(false);
      
      toast({
        title: "Publikasi gagal",
        description: error.message || "Terjadi kesalahan saat publikasi ke Supabase",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Koneksi Supabase</CardTitle>
        <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ConnectionStatus 
            status={connectionStatus === 'failed' ? 'disconnected' : connectionStatus} 
            onTestConnection={handleTestConnection}
            onRetryConnection={() => {
              // Kondisional: jika ada credential, coba koneksi ulang, jika tidak set ke pending
              if (projectId && apiUrl && apiKey) {
                verifyConnection(projectId, apiUrl, apiKey);
              } else {
                setConnectionStatus('pending');
              }
            }}
          />

          {connectionStatus === 'pending' && (
            <ConnectionForm 
              projectId={projectId}
              apiUrl={apiUrl}
              apiKey={apiKey}
              onProjectIdChange={setProjectId}
              onApiUrlChange={setApiUrl}
              onApiKeyChange={setApiKey}
              onConnect={handleConnect}
              formErrors={{
                projectId: formErrors.projectId || '',
                apiUrl: formErrors.apiUrl || '',
                apiKey: formErrors.apiKey || ''
              }}
              connectionInProgress={connectionInProgress}
            />
          )}

          {connectionStatus === 'connected' && (
            <>
              <ConnectedDetails 
                projectId={projectId}
                apiUrl={apiUrl}
                apiKey={apiKey}
                lastSync={lastSync || "Belum ada sinkronisasi"}
                tables={tables}
                isSyncing={isSyncing}
                onSync={handleSync}
                onShowApiKeyToggle={() => setShowApiKey(!showApiKey)}
                showApiKey={showApiKey}
              />

              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      onClick={handleActualPublish}
                      disabled={publicationInProgress}
                    >
                      <Database size={16} className="mr-2" />
                      {publicationInProgress ? "Sedang Publikasi..." : "Publikasikan ke Supabase"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Publikasikan semua perubahan ke database Supabase
                  </TooltipContent>
                </Tooltip>
                
                <Button 
                  variant="default" 
                  className="flex items-center gap-2"
                  onClick={handleTestConnection}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Uji Koneksi
                </Button>
              </div>
            </>
          )}

          <ConnectionHelp />
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnection;
