
import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Check, X, AlertTriangle, InfoIcon } from "lucide-react";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RealTimeSyncProps {
  onInitialSync?: () => void;
}

const RealTimeSync = ({ onInitialSync }: RealTimeSyncProps) => {
  const [syncing, setSyncing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const { toast } = useToast();
  
  // Daftar tabel yang akan disinkronkan secara real-time
  const tables = [
    { name: 'properties', display: 'Properti' },
    { name: 'profiles', display: 'Profil Pengguna' },
    { name: 'inquiries', display: 'Pesan Inquiry' },
    { name: 'settings', display: 'Pengaturan' },
  ];
  
  // Aktifkan real-time sync untuk setiap tabel
  const syncResults = tables.map(table => {
    return { 
      ...table, 
      ...useRealTimeSync(table.name, () => {
        toast({
          title: `Perubahan ${table.display}`,
          description: `Data ${table.display} telah diperbarui secara real-time`,
          className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        });
      }) 
    };
  });
  
  // Cek apakah semua tabel sudah tersinkronisasi
  const allSynced = syncResults.every(result => result.isSubscribed);
  
  // Periksa status koneksi Supabase
  const checkConnectionStatus = useCallback(async () => {
    try {
      setConnectionStatus('checking');
      
      // Cek koneksi ke Supabase
      const { error } = await supabase.from('settings').select('id').limit(1);
      
      if (error) {
        console.error("Kesalahan koneksi Supabase:", error);
        setConnectionStatus('disconnected');
        return;
      }
      
      setConnectionStatus('connected');
    } catch (err) {
      console.error("Gagal memeriksa status koneksi:", err);
      setConnectionStatus('disconnected');
    }
  }, []);
  
  // Periksa koneksi saat komponen dimuat
  useEffect(() => {
    checkConnectionStatus();
    
    // Periksa koneksi setiap 30 detik
    const intervalId = setInterval(() => {
      checkConnectionStatus();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [checkConnectionStatus]);
  
  useEffect(() => {
    if (allSynced && onInitialSync) {
      onInitialSync();
    }
  }, [allSynced, onInitialSync]);
  
  // Function untuk mengaktifkan SQL realtime
  const enableRealtimeForTables = useCallback(async () => {
    try {
      toast({
        title: "Mengaktifkan Realtime",
        description: "Menyiapkan konfigurasi real-time untuk semua tabel",
        duration: 5000,
      });
      
      // Aktifkan pengaturan realtime untuk semua tabel
      for (const table of tables) {
        try {
          // Coba aktifkan REPLICA IDENTITY FULL untuk tabel ini
          await supabase.rpc('enable_realtime_for_table', {
            table_name: table.name
          });
          
          console.log(`Berhasil mengaktifkan realtime untuk tabel ${table.name}`);
        } catch (err) {
          console.error(`Gagal mengaktifkan realtime untuk tabel ${table.name}:`, err);
        }
      }
      
    } catch (err) {
      console.error("Gagal mengaktifkan realtime:", err);
      toast({
        title: "Gagal Mengaktifkan Realtime",
        description: "Terjadi kesalahan saat mengaktifkan real-time. Lihat console untuk detail.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [tables, toast]);
  
  // Function to force resync all tables
  const handleResyncAll = () => {
    setSyncing(true);
    toast({
      title: "Menyinkronkan ulang...",
      description: "Sedang menyinkronkan ulang seluruh data",
      duration: 3000,
    });
    
    // Coba aktifkan realtime terlebih dahulu
    enableRealtimeForTables();
    
    // Simulasi proses sinkronisasi dan pemeriksaan status
    setTimeout(() => {
      setSyncing(false);
      
      // Periksa status semua tabel setelah sinkronisasi
      const syncedCount = syncResults.filter(result => result.isSubscribed).length;
      const totalTables = tables.length;
      
      if (syncedCount === totalTables) {
        toast({
          title: "Sinkronisasi selesai",
          description: `${syncedCount} dari ${totalTables} tabel telah berhasil disinkronkan`,
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
        });
      } else {
        toast({
          title: "Sinkronisasi sebagian",
          description: `${syncedCount} dari ${totalTables} tabel berhasil disinkronkan. ${totalTables - syncedCount} tabel gagal`,
          className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
        });
      }
    }, 3000);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Status Sinkronisasi Real-Time</span>
          <div className="flex items-center gap-2">
            {connectionStatus === 'checking' && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Memeriksa
              </Badge>
            )}
            
            {connectionStatus === 'connected' && (
              <Badge variant="outline" className={allSynced ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                {allSynced ? "Semua Aktif" : "Sebagian Aktif"}
              </Badge>
            )}
            
            {connectionStatus === 'disconnected' && (
              <Badge variant="outline" className="bg-red-50 text-red-700">
                Tidak Terhubung
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {syncResults.map((result, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded border">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result.isSubscribed ? 'bg-green-100' : 'bg-amber-100'}`}>
                  {result.isSubscribed ? 
                    <Check size={12} className="text-green-600" /> : 
                    <X size={12} className="text-amber-600" />
                  }
                </div>
                <span className="text-sm font-medium">{result.display}</span>
              </div>
              <Badge variant="outline" className={result.isSubscribed ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                {result.isSubscribed ? "Aktif" : "Tidak Aktif"}
              </Badge>
            </div>
          ))}
        </div>
        
        {connectionStatus === 'disconnected' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md flex gap-2 items-start">
            <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Tidak dapat terhubung ke database</p>
              <p className="mt-1">Pastikan koneksi internet Anda stabil dan server Supabase dapat diakses.</p>
            </div>
          </div>
        )}
        
        {!allSynced && connectionStatus === 'connected' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex gap-2 items-start">
            <InfoIcon size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Beberapa tabel belum tersinkronisasi</p>
              <p className="mt-1">Klik tombol "Sinkronkan Ulang Semua" di bawah untuk mencoba mengaktifkan semua tabel.</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleResyncAll}
          disabled={syncing || connectionStatus === 'disconnected'}
        >
          <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Sedang Menyinkronkan..." : "Sinkronkan Ulang Semua"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RealTimeSync;
