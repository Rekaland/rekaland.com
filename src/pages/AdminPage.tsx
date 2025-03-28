
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Home, 
  Users, 
  FileText, 
  Pencil, 
  ShoppingCart, 
  Settings 
} from "lucide-react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import PropertyManagement from "@/components/admin/PropertyManagement";
import UserManagement from "@/components/admin/UserManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import WebsiteEditor from "@/components/admin/WebsiteEditor";
import SalesManagement from "@/components/admin/SalesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    } else {
      // Welcome toast when admin successfully logs in
      toast({
        title: "Selamat datang, Admin!",
        description: "Akses ke Dashboard Admin berhasil.",
        duration: 3000,
      });
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  // If not authenticated or not admin, don't render anything
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  const handleTabChange = (value: string) => {
    toast({
      title: `Membuka panel ${value}`,
      description: `Anda sekarang melihat panel ${value}`,
      duration: 2000,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="analytics" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="mb-6 flex flex-wrap bg-white dark:bg-gray-800 p-1 border rounded-md">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <Activity size={16} className="mr-2" />
              Analisis
            </TabsTrigger>
            <TabsTrigger value="properties" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <Home size={16} className="mr-2" />
              Properti
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <Users size={16} className="mr-2" />
              Pengguna
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <FileText size={16} className="mr-2" />
              Konten
            </TabsTrigger>
            <TabsTrigger value="editor" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <Pencil size={16} className="mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <ShoppingCart size={16} className="mr-2" />
              Penjualan
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
              <Settings size={16} className="mr-2" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="properties">
            <PropertyManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="editor">
            <WebsiteEditor />
          </TabsContent>

          <TabsContent value="sales">
            <SalesManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
