
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { 
  Activity, 
  Home, 
  Users, 
  FileText, 
  Pencil, 
  ShoppingCart, 
  Settings,
  Menu,
  X,
  Globe,
  History,
  Save
} from "lucide-react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import PropertyManagement from "@/components/admin/PropertyManagement";
import UserManagement from "@/components/admin/UserManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import WebsiteEditor from "@/components/admin/WebsiteEditor";
import SalesManagement from "@/components/admin/SalesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import PublicationPanel from "@/components/admin/PublicationPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    } else {
      // Welcome toast when admin successfully logs in
      toast({
        title: "Selamat datang, Admin!",
        description: "Akses ke Dashboard Admin berhasil.",
        duration: 1000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  // If not authenticated or not admin, don't render anything
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `Membuka panel ${value}`,
      description: `Anda sekarang melihat panel ${value}`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  const menuItems = [
    { value: "analytics", label: "Analisis", icon: <Activity size={20} /> },
    { value: "properties", label: "Properti", icon: <Home size={20} /> },
    { value: "users", label: "Pengguna", icon: <Users size={20} /> },
    { value: "content", label: "Konten", icon: <FileText size={20} /> },
    { value: "editor", label: "Editor", icon: <Pencil size={20} /> },
    { value: "sales", label: "Penjualan", icon: <ShoppingCart size={20} /> },
    { value: "settings", label: "Pengaturan", icon: <Settings size={20} /> },
    { value: "publication", label: "Publikasi", icon: <Globe size={20} /> }
  ];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={cn(
          "bg-white shadow-md border-r transition-all duration-300 ease-in-out z-10",
          "fixed md:static md:block md:min-h-screen",
          "w-64 md:w-64 max-w-64 h-screen overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="p-6 hidden md:block">
            <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
          </div>
          
          <div className="space-y-1 p-2">
            {menuItems.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-normal px-3 py-6",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                  activeTab === item.value && "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900"
                )}
                onClick={() => handleTabChange(item.value)}
              >
                <span className="flex items-center space-x-3">
                  <span className={activeTab === item.value ? "text-orange-600" : "text-gray-500"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-300 ease-in-out p-4 md:p-8",
          !sidebarOpen && "md:ml-0"
        )}>
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "properties" && <PropertyManagement />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "content" && <ContentManagement />}
            {activeTab === "editor" && <WebsiteEditor />}
            {activeTab === "sales" && <SalesManagement />}
            {activeTab === "settings" && <SettingsManagement />}
            {activeTab === "publication" && <PublicationPanel />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
