
import { useState } from "react";
import { Database, Eye, FileText, RefreshCw, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SupabaseConnectionProps {
  onPublish?: () => void;
}

const SupabaseConnection = ({ onPublish }: SupabaseConnectionProps) => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("15 Jun 2023 13:45");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('connected');
  
  const handleSync = async () => {
    setIsSyncing(true);
    
    toast({
      title: "Sinkronisasi dimulai",
      description: "Sedang sinkronisasi dengan database Supabase",
      duration: 2000,
    });
    
    try {
      // Simulasi proses sinkronisasi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    toast({
      title: "Menguji koneksi",
      description: "Memeriksa koneksi ke Supabase",
      duration: 1000,
    });
    
    try {
      // Simulasi pengujian koneksi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus('connected');
      
      toast({
        title: "Koneksi berhasil",
        description: "Berhasil terhubung ke database Supabase",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Koneksi Supabase</CardTitle>
        <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className={cn(
            "border p-4 rounded-lg",
            connectionStatus === 'connected' 
              ? "bg-orange-50 border-orange-100" 
              : "bg-red-50 border-red-100"
          )}>
            <p className="font-medium flex items-center gap-2">
              <Database size={18} className={connectionStatus === 'connected' ? "text-orange-800" : "text-red-800"} />
              Status koneksi: {connectionStatus === 'connected' ? (
                <span className="text-orange-800">Terhubung</span>
              ) : (
                <span className="text-red-800">Terputus</span>
              )}
              <Badge variant={connectionStatus === 'connected' ? "outline" : "destructive"} className={connectionStatus === 'connected' ? "bg-green-50 ml-2" : "ml-2"}>
                {connectionStatus === 'connected' ? (
                  <Check size={12} className="mr-1" />
                ) : (
                  <X size={12} className="mr-1" />
                )}
                {connectionStatus === 'connected' ? "Aktif" : "Tidak Aktif"}
              </Badge>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {connectionStatus === 'connected' 
                ? "Database aktif dan berfungsi dengan normal" 
                : "Tidak dapat terhubung ke database, periksa pengaturan"
              }
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={handleTestConnection}
            >
              <RefreshCw size={14} className="mr-1" />
              Uji Koneksi
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="project-id">Supabase Project ID</Label>
              <Input id="project-id" value="rekaland-production-db" className="bg-gray-50" readOnly />
            </div>
            <div>
              <Label htmlFor="api-url">API URL</Label>
              <Input id="api-url" value="https://xxxxxxxxxxxx.supabase.co" className="bg-gray-50" readOnly />
            </div>
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex">
                <Input 
                  id="api-key" 
                  type={showApiKey ? "text" : "password"} 
                  value={showApiKey ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9" : "••••••••••••••••"} 
                  className="rounded-r-none bg-gray-50" 
                  readOnly 
                />
                <Button 
                  className="rounded-l-none" 
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  <Eye size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
            </div>

            <div>
              <Label htmlFor="sync-status">Status Sinkronisasi</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Terakhir sinkronisasi: {lastSync}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tabel yang terhubung</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>properties</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>users</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>content</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              ) : (
                <RefreshCw size={16} className="mr-2" />
              )}
              Sinkronisasi Ulang
            </Button>
            
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnection;
