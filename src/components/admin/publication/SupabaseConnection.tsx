
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

interface SupabaseConnectionProps {
  onPublish?: () => void;
  onConnectionChange?: (connected: boolean) => void;
  isConnected?: boolean;
}

const SupabaseConnection = ({ onPublish, onConnectionChange, isConnected: initialIsConnected }: SupabaseConnectionProps) => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  
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
    // Notify parent component about connection status
    if (onConnectionChange) {
      onConnectionChange(connectionStatus === 'connected');
    }
  }, [connectionStatus, onConnectionChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Koneksi Supabase</CardTitle>
        <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Connection Status Card */}
          <ConnectionStatus 
            status={connectionStatus} 
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
              formErrors={formErrors}
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
                      onClick={onPublish}
                    >
                      <Database size={16} className="mr-2" />
                      Publikasikan ke Supabase
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
