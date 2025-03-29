
import { useState, useEffect } from "react";
import { Database, Eye, FileText, RefreshCw, Check, X, Save, Globe, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SupabaseConnectionProps {
  onPublish?: () => void;
  onConnectionUpdate?: (status: boolean) => void;
}

const SupabaseConnection = ({ onPublish, onConnectionUpdate }: SupabaseConnectionProps) => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Belum pernah disinkronkan");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'pending'>('pending');
  const [connectionInProgress, setConnectionInProgress] = useState(false);
  
  // Form state
  const [projectId, setProjectId] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [formErrors, setFormErrors] = useState({
    projectId: false,
    apiUrl: false,
    apiKey: false,
  });
  
  // Tables status
  const [tables, setTables] = useState([
    { name: "properties", status: "pending" },
    { name: "users", status: "pending" },
    { name: "content", status: "pending" }
  ]);
  
  useEffect(() => {
    // Notify parent component about connection status
    if (onConnectionUpdate) {
      onConnectionUpdate(connectionStatus === 'connected');
    }
  }, [connectionStatus, onConnectionUpdate]);
  
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
      // Di sini nantinya kita akan melakukan koneksi ke Supabase sebenarnya
      // Untuk saat ini, kita gunakan simulasi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulasi pengecekan tabel
      setTables(prev => prev.map(table => ({...table, status: "checking"})));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulasi hasil pengecekan
      setTables([
        { name: "properties", status: "available" },
        { name: "users", status: "available" },
        { name: "content", status: "available" }
      ]);
      
      setConnectionStatus('connected');
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
    if (connectionStatus !== 'connected') {
      toast({
        title: "Koneksi tidak aktif",
        description: "Harap hubungkan ke Supabase terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Menguji koneksi",
      description: "Memeriksa koneksi ke Supabase",
      duration: 1000,
    });
    
    try {
      // Simulasi pengujian koneksi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const renderConnectionStatus = () => {
    if (connectionStatus === 'pending') {
      return (
        <Alert className="bg-gray-50 border-gray-200">
          <Database className="h-4 w-4 text-gray-500" />
          <AlertTitle className="text-gray-800">Belum terhubung</AlertTitle>
          <AlertDescription className="text-gray-600">
            Silakan masukkan informasi koneksi Supabase dan klik tombol "Hubungkan".
          </AlertDescription>
        </Alert>
      );
    }
    
    if (connectionStatus === 'connected') {
      return (
        <div className="border p-4 rounded-lg bg-green-50 border-green-100">
          <p className="font-medium flex items-center gap-2">
            <Database size={18} className="text-green-800" />
            Status koneksi: <span className="text-green-800">Terhubung</span>
            <Badge variant="outline" className="bg-green-50 ml-2">
              <Check size={12} className="mr-1" />
              Aktif
            </Badge>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Database aktif dan berfungsi dengan normal
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
      );
    }
    
    return (
      <div className="border p-4 rounded-lg bg-red-50 border-red-100">
        <p className="font-medium flex items-center gap-2">
          <Database size={18} className="text-red-800" />
          Status koneksi: <span className="text-red-800">Terputus</span>
          <Badge variant="destructive" className="ml-2">
            <X size={12} className="mr-1" />
            Tidak Aktif
          </Badge>
        </p>
        <p className="text-sm text-red-700 mt-1">
          Tidak dapat terhubung ke database, periksa pengaturan
        </p>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2" 
          onClick={() => setConnectionStatus('pending')}
        >
          <RefreshCw size={14} className="mr-1" />
          Coba Sambungkan Kembali
        </Button>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Koneksi Supabase</CardTitle>
        <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Connection Status Card */}
          {renderConnectionStatus()}

          {connectionStatus === 'pending' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-id">Supabase Project ID</Label>
                <Input 
                  id="project-id" 
                  value={projectId} 
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="Masukkan ID project Supabase" 
                  className={formErrors.projectId ? "border-red-300" : ""}
                />
                {formErrors.projectId && (
                  <p className="text-sm text-red-500 mt-1">Project ID diperlukan</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="api-url">API URL</Label>
                <Input 
                  id="api-url" 
                  value={apiUrl} 
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://[your-project].supabase.co" 
                  className={formErrors.apiUrl ? "border-red-300" : ""}
                />
                {formErrors.apiUrl && (
                  <p className="text-sm text-red-500 mt-1">URL API Supabase tidak valid</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex">
                  <Input 
                    id="api-key" 
                    type={showApiKey ? "text" : "password"} 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Supabase anon/public API key" 
                    className={cn("rounded-r-none", formErrors.apiKey ? "border-red-300" : "")}
                  />
                  <Button 
                    className="rounded-l-none" 
                    variant="outline"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    <Eye size={16} />
                  </Button>
                </div>
                {formErrors.apiKey && (
                  <p className="text-sm text-red-500 mt-1">API key diperlukan</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
              </div>
              
              <Button 
                onClick={handleConnect}
                disabled={connectionInProgress}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {connectionInProgress ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Menghubungkan...
                  </>
                ) : (
                  <>
                    <Database size={16} className="mr-2" />
                    Hubungkan ke Supabase
                  </>
                )}
              </Button>
              
              <p className="text-sm text-gray-500 mt-2">
                Konfigurasi ini digunakan untuk menghubungkan aplikasi ke database Supabase Anda.
                Pastikan API key dan URL sudah benar.
              </p>
            </div>
          )}

          {connectionStatus === 'connected' && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-id">Supabase Project ID</Label>
                  <Input id="project-id" value={projectId} className="bg-gray-50" readOnly />
                </div>
                <div>
                  <Label htmlFor="api-url">API URL</Label>
                  <Input id="api-url" value={apiUrl} className="bg-gray-50" readOnly />
                </div>
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input 
                      id="api-key" 
                      type={showApiKey ? "text" : "password"} 
                      value={showApiKey ? apiKey : '••••••••••••••••'} 
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
                  {tables.map((table) => (
                    <div key={table.name} className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <span>{table.name}</span>
                      </div>
                      <Badge variant="outline" className={cn(
                        table.status === "available" ? "bg-green-50" : 
                        table.status === "checking" ? "bg-blue-50" : 
                        "bg-red-50"
                      )}>
                        {table.status === "available" ? "Tersedia" : 
                         table.status === "checking" ? "Memeriksa..." : 
                         "Tidak tersedia"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
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
            </>
          )}

          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-semibold mb-2">Petunjuk Koneksi Supabase</h4>
            <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
              <li>Buat akun di Supabase.com jika belum punya</li>
              <li>Buat project baru di dashboard Supabase</li>
              <li>Salin Project ID dari URL dashboard Supabase</li>
              <li>Salin API URL dari halaman Settings &gt; API</li>
              <li>Salin anon/public API key dari halaman yang sama</li>
              <li>Masukkan informasi di atas dan klik "Hubungkan ke Supabase"</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnection;
