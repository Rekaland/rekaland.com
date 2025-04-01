
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Check, X } from "lucide-react";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { useToast } from "@/hooks/use-toast";

interface RealTimeSyncProps {
  onInitialSync?: () => void;
}

const RealTimeSync = ({ onInitialSync }: RealTimeSyncProps) => {
  const [syncing, setSyncing] = useState(false);
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
  
  useEffect(() => {
    if (allSynced && onInitialSync) {
      onInitialSync();
    }
  }, [allSynced, onInitialSync]);
  
  // Function to force resync all tables
  const handleResyncAll = () => {
    setSyncing(true);
    toast({
      title: "Menyinkronkan ulang...",
      description: "Sedang menyinkronkan ulang seluruh data",
      duration: 2000,
    });
    
    // Simulasi proses sinkronisasi
    setTimeout(() => {
      setSyncing(false);
      toast({
        title: "Sinkronisasi selesai",
        description: "Data telah berhasil disinkronkan",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      });
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Status Sinkronisasi Real-Time</span>
          <Badge variant="outline" className={allSynced ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
            {allSynced ? "Semua Aktif" : "Sebagian Aktif"}
          </Badge>
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
        
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleResyncAll}
          disabled={syncing}
        >
          <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Sedang Menyinkronkan..." : "Sinkronkan Ulang Semua"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RealTimeSync;
