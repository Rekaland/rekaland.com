
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, Globe, Database } from "lucide-react";
import DeploymentStatus from "./publication/DeploymentStatus";
import DeploymentHistory from "./publication/DeploymentHistory";
import ChangeHistory from "./publication/ChangeHistory";
import SupabaseConnection from "./publication/SupabaseConnection";

// Simulasi data untuk riwayat deployment
const mockDeploymentHistory = [
  { id: 1, version: "v1.2.3", timestamp: "15 Jun 2023 13:45", status: "Sukses", author: "Admin User", changes: 15 },
  { id: 2, version: "v1.2.2", timestamp: "10 Jun 2023 09:20", status: "Sukses", author: "Admin User", changes: 8 },
  { id: 3, version: "v1.2.1", timestamp: "5 Jun 2023 14:30", status: "Gagal", author: "Admin User", changes: 12 },
  { id: 4, version: "v1.2.0", timestamp: "1 Jun 2023 10:15", status: "Sukses", author: "Admin User", changes: 23 },
];

const PublicationPanel = () => {
  const { toast } = useToast();
  const [deploymentHistory, setDeploymentHistory] = useState(mockDeploymentHistory);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handlePublish = async () => {
    setIsPublishing(true);
    
    toast({
      title: "Memulai publikasi ke Supabase",
      description: "Sedang menyinkronkan data dengan database Supabase...",
      duration: 3000,
      className: "bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
    
    try {
      // Simulasi proses publikasi ke Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Menambahkan entri baru ke riwayat deployment
      const newDeployment = {
        id: Date.now(),
        version: `v1.2.${deploymentHistory.length + 1}`,
        timestamp: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: "Sukses",
        author: "Admin User",
        changes: Math.floor(Math.random() * 20) + 1
      };
      
      setDeploymentHistory(prev => [newDeployment, ...prev]);
      
      toast({
        title: "Publikasi Berhasil!",
        description: "Data berhasil diperbarui dan disinkronkan dengan Supabase",
        duration: 5000,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    } catch (error) {
      console.error("Error during publication:", error);
      
      toast({
        title: "Publikasi Gagal",
        description: "Terjadi kesalahan saat menyinkronkan data dengan Supabase",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Publikasi Website</h2>
          <p className="text-sm text-gray-500 mt-1">
            Publikasikan perubahan konten dan konfigurasi ke Supabase
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Preview dibuka",
                description: "Membuka preview website di tab baru",
                duration: 1000,
                className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
              });
            }}
          >
            <Eye size={16} />
            Preview
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Publikasi...
              </>
            ) : (
              <>
                <Globe size={16} className="mr-2" />
                Publikasikan ke Supabase
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="deployment">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="deployment">Status Deployment</TabsTrigger>
          <TabsTrigger value="history">Riwayat Perubahan</TabsTrigger>
          <TabsTrigger value="connection">Koneksi Supabase</TabsTrigger>
        </TabsList>

        <TabsContent value="deployment" className="space-y-4">
          <DeploymentStatus />
          <DeploymentHistory deploymentHistory={deploymentHistory} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <ChangeHistory deploymentHistory={deploymentHistory} />
        </TabsContent>

        <TabsContent value="connection" className="space-y-4">
          <SupabaseConnection onPublish={handlePublish} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationPanel;
