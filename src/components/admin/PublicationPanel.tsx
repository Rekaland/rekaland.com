
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, Globe } from "lucide-react";
import DeploymentStatus from "./publication/DeploymentStatus";
import DeploymentHistory from "./publication/DeploymentHistory";
import ChangeHistory from "./publication/ChangeHistory";
import SupabaseConnection from "./publication/SupabaseConnection";

const PublicationPanel = () => {
  const { toast } = useToast();
  const [deploymentHistory] = useState([
    { id: 1, version: "v1.2.3", timestamp: "15 Jun 2023 13:45", status: "Sukses", author: "Admin User", changes: 15 },
    { id: 2, version: "v1.2.2", timestamp: "10 Jun 2023 09:20", status: "Sukses", author: "Admin User", changes: 8 },
    { id: 3, version: "v1.2.1", timestamp: "5 Jun 2023 14:30", status: "Gagal", author: "Admin User", changes: 12 },
    { id: 4, version: "v1.2.0", timestamp: "1 Jun 2023 10:15", status: "Sukses", author: "Admin User", changes: 23 },
  ]);

  const handlePublish = () => {
    toast({
      title: "Memulai publikasi website",
      description: "Website sedang dalam proses publikasi",
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
    
    // Simulate publication process
    setTimeout(() => {
      toast({
        title: "Publikasi Berhasil!",
        description: "Website telah berhasil dipublikasikan",
        duration: 1000,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Publikasi Website</h2>
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
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
          >
            <Globe size={16} />
            Publikasikan Sekarang
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
          <SupabaseConnection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationPanel;
