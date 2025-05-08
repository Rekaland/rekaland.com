
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import PropertyManagement from "@/components/admin/PropertyManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import UserManagement from "@/components/admin/UserManagement";
import DebugConsole from "@/components/admin/DebugConsole";
import DeveloperTools from "@/components/admin/DeveloperTools";
import ProjectKnowledge from "@/components/admin/ProjectKnowledge";
import WebsiteEditor from "@/components/admin/WebsiteEditor";
import RealTimeSync from "@/components/admin/RealTimeSync";
import EnhancedContentManagement from "@/components/admin/EnhancedContentManagement";
import EnhancedPropertyManagement from "@/components/admin/EnhancedPropertyManagement";
import ProductContentManagement from "@/components/admin/ProductContentManagement";
import DashboardTools from "@/components/admin/DashboardTools";
import PropertyManagerVerification from "@/components/admin/PropertyManagerVerification";
import {
  LayoutDashboard,
  Home,
  Settings,
  Users,
  FileText,
  Database,
  Globe,
  Terminal,
  Package,
  Code,
  Wrench,
  UserCheck
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const syncNotifiedRef = useRef(false);

  const handleInitialSync = () => {
    // Prevent multiple notifications
    if (syncNotifiedRef.current) return;
    syncNotifiedRef.current = true;
    
    toast({
      title: "Real-Time Sync Aktif",
      description: "Semua tabel telah tersinkronisasi secara real-time",
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    });
  };

  // Reset notification flag when component unmounts and remounts
  useEffect(() => {
    return () => {
      syncNotifiedRef.current = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Kelola dan pantau website Rekaland</p>
        </div>

        <div className="mt-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="bg-white dark:bg-gray-800 border rounded-lg p-1 overflow-x-auto hide-scrollbar">
              <TabsList className="inline-flex min-w-max w-full md:w-auto">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="properties" className="flex items-center gap-2">
                  <Home size={16} />
                  Properti
                </TabsTrigger>
                <TabsTrigger value="property_managers" className="flex items-center gap-2">
                  <UserCheck size={16} />
                  Pengelola
                </TabsTrigger>
                <TabsTrigger value="contents" className="flex items-center gap-2">
                  <FileText size={16} />
                  Konten
                </TabsTrigger>
                <TabsTrigger value="product_contents" className="flex items-center gap-2">
                  <Package size={16} />
                  Konten Produk
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users size={16} />
                  Pengguna
                </TabsTrigger>
                <TabsTrigger value="website" className="flex items-center gap-2">
                  <Globe size={16} />
                  Website
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Wrench size={16} />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="developers" className="flex items-center gap-2">
                  <Code size={16} />
                  Developer
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Real-Time Sync</CardTitle>
                      <CardDescription>Status koneksi real-time ke database</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RealTimeSync onInitialSync={handleInitialSync} />
                    </CardContent>
                  </Card>
                </div>
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="properties">
                <PropertyManagement />
              </TabsContent>

              <TabsContent value="property_managers">
                <PropertyManagerVerification />
              </TabsContent>

              <TabsContent value="contents">
                <EnhancedContentManagement />
              </TabsContent>

              <TabsContent value="product_contents">
                <ProductContentManagement />
              </TabsContent>

              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              <TabsContent value="website">
                <WebsiteEditor />
              </TabsContent>
              
              <TabsContent value="tools">
                <DashboardTools />
              </TabsContent>

              <TabsContent value="developers">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DebugConsole />
                  <DeveloperTools />
                </div>
                <div className="mt-6">
                  <ProjectKnowledge />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
