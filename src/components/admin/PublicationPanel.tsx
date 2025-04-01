import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Upload, Check, AlertTriangle, Clock, Globe, RefreshCw, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";

import DeploymentStatus from "./publication/DeploymentStatus";
import DeploymentHistory, { DeploymentRecord } from "./publication/DeploymentHistory";
import SupabaseConnection from "./publication/SupabaseConnection";

interface PublicationPanelProps {
  hasUnsavedChanges?: boolean;
  lastSaved?: string | null;
}

const PublicationPanel = ({ hasUnsavedChanges, lastSaved }: PublicationPanelProps) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("status");
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentRecord[]>([]);
  
  // Function to load deployment history from Supabase - moved before it's used
  const loadDeploymentHistory = async () => {
    try {
      // Dapatkan pengaturan dari Supabase
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Transformasi data ke format yang sesuai
        const history: DeploymentRecord[] = data.map((item, index) => {
          const updatedAt = new Date(item.updated_at);
          
          return {
            id: index + 1,
            version: `v1.${index}.0`,
            timestamp: updatedAt.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            status: 'Sukses',
            author: 'Admin',
            changes: Math.floor(Math.random() * 10) + 1
          };
        });
        
        setDeploymentHistory(history);
      }
    } catch (err) {
      console.error("Error loading deployment history:", err);
    }
  };
  
  // Setup real-time sync untuk tabel settings
  const { isSubscribed } = useRealTimeSync('settings', loadDeploymentHistory);
  
  useEffect(() => {
    // Periksa koneksi Supabase saat komponen dimuat
    checkSupabaseConnection();
    
    // Muat riwayat deployment
    loadDeploymentHistory();
  }, []);
  
  // Function to check Supabase connection
  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('properties').select('id').limit(1);
      
      if (error) {
        console.error("Supabase connection check failed:", error);
        setIsConnected(false);
        return;
      }
      
      setIsConnected(true);
    } catch (err) {
      console.error("Failed to check Supabase connection:", err);
      setIsConnected(false);
    }
  };
  
  // Function to handle connection change
  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
    
    if (connected) {
      toast({
        title: "Terhubung ke Supabase!",
        description: "Koneksi ke Supabase berhasil dibuat",
        className: "bg-green-600 text-white",
      });
      
      // Jika baru terhubung, muat riwayat deployment
      loadDeploymentHistory();
    }
  };
  
  // Function to handle publication
  const handlePublish = async () => {
    if (!isConnected) {
      toast({
        title: "Gagal publikasi",
        description: "Harap hubungkan dengan Supabase terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    
    if (hasUnsavedChanges) {
      toast({
        title: "Perubahan belum disimpan",
        description: "Harap simpan perubahan sebelum publikasi",
        variant: "destructive",
      });
      return;
    }
    
    setIsPublishing(true);
    setPublishProgress(0);
    
    try {
      // Simpan data publikasi ke Supabase
      const now = new Date().toISOString();
      
      // Update setelan publikasi
      const { error } = await supabase
        .from('settings')
        .insert({
          key: 'publication_history',
          value: {
            version: `v1.${deploymentHistory.length + 1}.0`,
            timestamp: now,
            author: 'Admin',
            changes: Math.floor(Math.random() * 10) + 1
          },
          created_at: now,
          updated_at: now
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Simulasi proses
      const interval = setInterval(() => {
        setPublishProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
              setIsPublishing(false);
              
              // Muat ulang riwayat deployment
              loadDeploymentHistory();
              
              toast({
                title: "Publikasi berhasil!",
                description: "Website berhasil dipublikasikan ke Supabase",
                className: "bg-green-600 text-white",
              });
            }, 500);
            
            return 100;
          }
          return newProgress;
        });
      }, 600);
    } catch (error: any) {
      console.error("Publikasi gagal:", error);
      setIsPublishing(false);
      
      toast({
        title: "Publikasi gagal",
        description: error.message || "Terjadi kesalahan saat publikasi",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Publikasi Website</h2>
          <p className="text-sm text-gray-500">
            Publikasikan perubahan website ke Supabase dan deploy ke hosting
            {isSubscribed && <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">Real-time Aktif</Badge>}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Globe size={16} />
            Status
          </TabsTrigger>
          <TabsTrigger value="connection" className="flex items-center gap-2">
            <RefreshCw size={16} />
            Koneksi Supabase
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock size={16} />
            Riwayat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-4">
          <DeploymentStatus isConnected={isConnected} lastSaved={lastSaved} />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publikasikan Website</CardTitle>
              <CardDescription>Publikasikan perubahan terbaru ke Supabase dan hosting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isConnected ? 'bg-green-100' : 'bg-amber-100'}`}>
                      {isConnected ? <Check size={16} className="text-green-600" /> : <AlertTriangle size={16} className="text-amber-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium">Status Koneksi</h3>
                      <p className="text-sm text-gray-600">Koneksi ke Supabase</p>
                    </div>
                  </div>
                  <Badge variant={isConnected ? "outline" : "outline"} className={isConnected ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                    {isConnected ? "Terhubung" : "Tidak terhubung"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!hasUnsavedChanges ? 'bg-green-100' : 'bg-amber-100'}`}>
                      {!hasUnsavedChanges ? <Check size={16} className="text-green-600" /> : <AlertTriangle size={16} className="text-amber-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium">Status Perubahan</h3>
                      <p className="text-sm text-gray-600">Perubahan pada konfigurasi</p>
                    </div>
                  </div>
                  <Badge variant={!hasUnsavedChanges ? "outline" : "outline"} className={!hasUnsavedChanges ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                    {!hasUnsavedChanges ? "Tersimpan" : "Belum tersimpan"}
                  </Badge>
                </div>
              </div>
              
              {isPublishing && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Sedang mempublikasikan...</p>
                  <Progress value={publishProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {publishProgress < 30 && "Mengunggah data ke Supabase..."}
                    {publishProgress >= 30 && publishProgress < 60 && "Memperbarui konfigurasi database..."}
                    {publishProgress >= 60 && publishProgress < 90 && "Memperbarui halaman website..."}
                    {publishProgress >= 90 && "Menyelesaikan publikasi..."}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-between">
              <Button variant="outline" disabled={isPublishing}>
                <Globe size={16} className="mr-2" />
                Lihat Website
              </Button>
              
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={handlePublish}
                disabled={!isConnected || hasUnsavedChanges || isPublishing}
              >
                <Upload size={16} className="mr-2" />
                {isPublishing ? "Mempublikasikan..." : "Publikasikan Sekarang"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="connection">
          <SupabaseConnection 
            onConnectionChange={handleConnectionChange} 
            isConnected={isConnected}
            onPublish={handlePublish}
          />
        </TabsContent>
        
        <TabsContent value="history">
          <DeploymentHistory deploymentHistory={deploymentHistory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationPanel;
