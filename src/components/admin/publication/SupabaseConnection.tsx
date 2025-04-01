import { useState, useEffect } from "react";
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
    handleTestConnection
  } = useSupabaseConnection(initialIsConnected);
  
  useEffect(() => {
    if (onConnectionChange) {
      onConnectionChange(connectionStatus === 'connected');
    }
  }, [connectionStatus, onConnectionChange]);

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
      
      const now = new Date().toISOString();
      
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
        lastPublished: now,
        tables: tablesJson
      };
      
      if (existingSettings) {
        saveResult = await supabase
          .from('settings')
          .update({
            value: settingsObject as any,
            updated_at: now
          })
          .eq('key', 'website_settings');
      } else {
        saveResult = await supabase
          .from('settings')
          .insert({
            key: 'website_settings',
            value: settingsObject as any,
            created_at: now,
            updated_at: now
          });
      }
      
      if (saveResult && saveResult.error) {
        throw new Error(saveResult.error.message);
      }
      
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
            onRetryConnection={() => setConnectionStatus('pending')}
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
                lastSync={lastSync}
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
                
                <Button variant="default" className="flex items-center gap-2">
                  <FileText size={16} className="mr-2" />
                  Dokumentasi
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
