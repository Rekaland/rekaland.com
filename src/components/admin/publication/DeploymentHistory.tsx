
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DeploymentRecord {
  id: number;
  version: string;
  timestamp: string;
  status: string;
  author: string;
  changes: number;
}

export interface DeploymentHistoryProps {
  deploymentHistory?: DeploymentRecord[];
}

const DeploymentHistory = ({ deploymentHistory: initialDeploymentHistory }: DeploymentHistoryProps) => {
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentRecord[]>(initialDeploymentHistory || []);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDeploymentHistory = async () => {
    setLoading(true);
    try {
      // Di implementasi nyata, ini akan mengambil data dari Supabase
      // Contoh fetch data dari tabel deployment_history:
      // const { data, error } = await supabase
      //   .from('deployment_history')
      //   .select('*')
      //   .order('timestamp', { ascending: false });
      
      // if (error) throw error;
      // setDeploymentHistory(data);

      // Untuk saat ini, gunakan data sampel
      setDeploymentHistory([
        {
          id: 1,
          version: "v1.2.0",
          timestamp: "15 Jun 2023 13:45",
          status: "Sukses",
          author: "Admin",
          changes: 12
        },
        {
          id: 2,
          version: "v1.1.5",
          timestamp: "10 Jun 2023 09:20",
          status: "Sukses",
          author: "Admin",
          changes: 5
        },
        {
          id: 3,
          version: "v1.1.0",
          timestamp: "05 Jun 2023 16:30",
          status: "Sukses",
          author: "Admin",
          changes: 8
        }
      ]);
      
      toast({
        title: "Riwayat deployment diperbarui",
        description: "Data riwayat deployment berhasil dimuat",
        duration: 1000,
      });
    } catch (error: any) {
      console.error("Error fetching deployment history:", error);
      toast({
        title: "Gagal memuat riwayat",
        description: error.message || "Terjadi kesalahan saat memuat riwayat deployment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialDeploymentHistory) {
      fetchDeploymentHistory();
    }
  }, [initialDeploymentHistory]);

  const handleRollback = async (id: number) => {
    try {
      // Di implementasi nyata, ini akan melakukan rollback melalui API Supabase
      // Contoh:
      // const { data, error } = await supabase
      //   .functions.invoke('rollback-deployment', { id });
      
      // if (error) throw error;
      
      toast({
        title: "Rollback berhasil",
        description: `Berhasil melakukan rollback ke versi ${deploymentHistory.find(item => item.id === id)?.version}`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
    } catch (error: any) {
      toast({
        title: "Gagal melakukan rollback",
        description: error.message || "Terjadi kesalahan saat mencoba rollback",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Riwayat Deployment</CardTitle>
            <CardDescription>Daftar deployment terbaru</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchDeploymentHistory} 
            disabled={loading}
          >
            <RefreshCw size={14} className={cn("mr-1", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-2 text-left">Versi</th>
                <th className="py-3 px-2 text-left">Waktu</th>
                <th className="py-3 px-2 text-left">Status</th>
                <th className="py-3 px-2 text-left">Penulis</th>
                <th className="py-3 px-2 text-left">Perubahan</th>
                <th className="py-3 px-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {deploymentHistory.length > 0 ? (
                deploymentHistory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{item.version}</td>
                    <td className="py-3 px-2">{item.timestamp}</td>
                    <td className="py-3 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs", 
                        item.status === "Sukses" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{item.author}</td>
                    <td className="py-3 px-2">{item.changes} perubahan</td>
                    <td className="py-3 px-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-xs"
                        onClick={() => handleRollback(item.id)}
                      >
                        <RefreshCw size={14} className="mr-1" />
                        Rollback
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    {loading ? "Memuat data..." : "Tidak ada riwayat deployment"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;
