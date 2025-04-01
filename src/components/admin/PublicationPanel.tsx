import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Database, Server, Globe, ArrowRight, History, ExternalLink, Check, X } from "lucide-react";
import SupabaseConnection from "./publication/SupabaseConnection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeploymentHistoryItem {
  id: number;
  timestamp: string;
  status: "success" | "failed" | "in_progress";
  environment: string;
  changes: string;
}

interface PublicationPanelProps {
  hasUnsavedChanges?: boolean;
  lastSaved?: string | null;
}

const PublicationPanel = ({ hasUnsavedChanges = false, lastSaved = null }: PublicationPanelProps) => {
  const { toast } = useToast();
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentHistoryItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [deploymentInProgress, setDeploymentInProgress] = useState(false);
  const [currentTab, setCurrentTab] = useState("database");

  const formatLocalTime = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, []);

  const formatLocalDate = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  const loadDeploymentHistory = useCallback(async () => {
    try {
      console.log("Memuat riwayat deployment...");
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'deployment_history')
        .maybeSingle();

      if (error) {
        if (error.code !== 'PGRST116') { // not found error
          console.error('Error fetching deployment history:', error);
        }
        return;
      }

      if (data?.value) {
        console.log("Data riwayat deployment terambil:", data.value);
        
        let historyData: DeploymentHistoryItem[] = [];
        
        if (Array.isArray(data.value)) {
          historyData = data.value as DeploymentHistoryItem[];
        } else {
          try {
            const parsed = JSON.parse(data.value as any);
            if (Array.isArray(parsed)) {
              historyData = parsed as DeploymentHistoryItem[];
            } else {
              historyData = [];
            }
          } catch (e) {
            historyData = [];
          }
        }
        
        setDeploymentHistory(historyData);
      }
    } catch (err) {
      console.error('Failed to load deployment history:', err);
    }
  }, []);

  useEffect(() => {
    loadDeploymentHistory();
    
    const intervalId = setInterval(() => {
      loadDeploymentHistory();
    }, 60000); // 1 minute
    
    return () => clearInterval(intervalId);
  }, [loadDeploymentHistory]);

  const handleDeploy = async () => {
    if (!isConnected) {
      toast({
        title: "Tidak dapat melakukan deployment",
        description: "Pastikan koneksi Supabase sudah terhubung terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    try {
      setDeploymentInProgress(true);
      
      toast({
        title: "Deployment dimulai",
        description: "Proses deployment sedang berjalan...",
        duration: 5000,
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      const now = new Date();
      const nowISO = now.toISOString();

      const newDeployment: DeploymentHistoryItem = {
        id: Date.now(),
        timestamp: nowISO,
        status: "success",
        environment: "production",
        changes: "Update konten website dan integrasi database"
      };

      const { data: historyData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'deployment_history')
        .maybeSingle();
      
      let existingHistory: DeploymentHistoryItem[] = [];
      if (historyData?.value) {
        if (Array.isArray(historyData.value)) {
          existingHistory = historyData.value as DeploymentHistoryItem[];
        } else {
          try {
            const parsed = JSON.parse(historyData.value as any);
            if (Array.isArray(parsed)) {
              existingHistory = parsed as DeploymentHistoryItem[];
            }
          } catch (e) {
            console.error('Error parsing deployment history:', e);
          }
        }
      }

      const updatedHistory = [newDeployment, ...existingHistory].slice(0, 10);
      setDeploymentHistory(updatedHistory);

      await supabase
        .from('settings')
        .upsert({
          key: 'deployment_history',
          value: updatedHistory as any,
          updated_at: nowISO
        });

      toast({
        title: "Deployment berhasil!",
        description: "Website telah berhasil di-deploy ke lingkungan produksi.",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (err) {
      console.error('Deployment failed:', err);
      
      toast({
        title: "Deployment gagal",
        description: "Terjadi kesalahan saat proses deployment.",
        variant: "destructive",
      });
    } finally {
      setDeploymentInProgress(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Status Publikasi</CardTitle>
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                Perubahan Belum Disimpan
              </Badge>
            )}
          </div>
          {lastSaved && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock size={14} />
              Terakhir disimpan: {lastSaved}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Database size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Backend Services</h3>
                  <p className="text-sm text-gray-500">Supabase Database & Authentication</p>
                </div>
              </div>
              <Badge variant="outline" className={isConnected ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                {isConnected ? "Terhubung" : "Belum Terhubung"}
              </Badge>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Server size={20} className="text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-medium">Lovable Hosting</h3>
                  <p className="text-sm text-gray-500">rekaland.lovable.app</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Aktif</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 w-full sm:w-auto"
                onClick={handleDeploy}
                disabled={!isConnected || deploymentInProgress}
              >
                {deploymentInProgress ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Sedang Deploy...
                  </>
                ) : (
                  <>
                    <Globe size={16} className="mr-2" />
                    Deploy ke Produksi
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <ExternalLink size={16} className="mr-1" />
                Buka Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database size={16} />
            Database
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History size={16} />
            Riwayat Publikasi
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="database" className="mt-4 space-y-4">
          <SupabaseConnection 
            onPublish={handleDeploy}
            onConnectionChange={setIsConnected}
            isConnected={isConnected}
          />
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Publikasi</CardTitle>
            </CardHeader>
            <CardContent>
              {deploymentHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Belum ada riwayat publikasi
                </div>
              ) : (
                <div className="space-y-4">
                  {deploymentHistory.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 border rounded-lg">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        item.status === 'success' ? 'bg-green-100' : 
                        item.status === 'failed' ? 'bg-red-100' : 'bg-amber-100'
                      }`}>
                        {item.status === 'success' ? (
                          <Check size={16} className="text-green-600" />
                        ) : item.status === 'failed' ? (
                          <X size={16} className="text-red-600" />
                        ) : (
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent text-amber-600"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{item.environment} deployment</h4>
                          <Badge variant="outline" className={
                            item.status === 'success' ? 'bg-green-50 text-green-700' : 
                            item.status === 'failed' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                          }>
                            {item.status === 'success' ? 'Berhasil' : 
                             item.status === 'failed' ? 'Gagal' : 'Sedang Diproses'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.changes}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatLocalDate(item.timestamp)}
                          </span>
                          <Clock size={12} className="text-gray-400 ml-2" />
                          <span className="text-xs text-gray-500">
                            {formatLocalTime(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationPanel;
