
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '../hooks/use-toast';
import { 
  Settings, Users, FileText, BarChart3, Globe, Box, 
  PanelLeft, Save, ChevronRight, ChevronLeft, Home,
  MessageSquare, Upload, Bell, Search, Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EnhancedContentManagement from '@/components/admin/EnhancedContentManagement';
import EnhancedPropertyManagement from '@/components/admin/EnhancedPropertyManagement';
import { useIsMobile } from '@/hooks/use-mobile';
import UserManagement from '@/components/admin/UserManagement';
import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard';
import MessagingCenter from '@/components/admin/MessagingCenter';
import SystemSettings from '@/components/admin/SystemSettings';
import WebsiteEditor from '@/components/admin/WebsiteEditor';

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Auto-collapse sidebar on mobile
    if (isMobile) {
      setIsCollapsed(true);
    }
    
    toast({
      title: "Selamat datang, Admin!",
      description: "Anda dapat mengelola konten dan properti website Rekaland disini.",
    });
  }, [isMobile]);

  const handlePublish = () => {
    toast({
      title: "Perubahan dipublikasikan!",
      description: "Seluruh perubahan berhasil dipublikasikan ke website",
      className: "bg-green-600 text-white"
    });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderSidebarButton = (icon, label, tabName) => {
    return (
      <Button 
        variant={activeTab === tabName ? "default" : "ghost"} 
        className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full mb-1`}
        onClick={() => setActiveTab(tabName)}
      >
        {icon}
        {!isCollapsed && <span className="ml-2">{label}</span>}
      </Button>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r shadow-sm transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} fixed h-screen z-30`}>
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && <h2 className="font-bold text-xl">Rekaland Admin</h2>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <div className="flex flex-col gap-2 p-3 flex-1 overflow-y-auto">
          {renderSidebarButton(<Home size={18} />, "Dashboard", "dashboard")}
          {renderSidebarButton(<FileText size={18} />, "Konten", "content")}
          {renderSidebarButton(<Box size={18} />, "Properti", "property")}
          {renderSidebarButton(<Users size={18} />, "Pengguna", "users")}
          {renderSidebarButton(<BarChart3 size={18} />, "Analitik", "analytics")}
          {renderSidebarButton(<Globe size={18} />, "Website", "website")}
          {renderSidebarButton(<MessageSquare size={18} />, "Pesan", "messages")}
          {renderSidebarButton(<Settings size={18} />, "Pengaturan", "settings")}
        </div>

        <div className="p-4 border-t">
          <Button 
            variant="default" 
            onClick={handlePublish}
            className={`w-full flex items-center justify-${isCollapsed ? 'center' : 'between'} bg-green-600 hover:bg-green-700`}
          >
            <Save size={18} />
            {!isCollapsed && <span className="ml-2">Publikasikan</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Navigation */}
        <header className="bg-white border-b p-4 sticky top-0 z-20 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold mr-6">Dashboard Admin</h1>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Cari..." 
                  className="pl-9 w-[250px] bg-gray-50"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell size={18} />
              </Button>
              <Link to="/">
                <Button variant="outline">
                  <Home size={16} className="mr-2" />
                  <span>Lihat Website</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header with Actions */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {activeTab === "dashboard" && "Dashboard Utama"}
                  {activeTab === "content" && "Manajemen Konten"}
                  {activeTab === "property" && "Manajemen Properti"}
                  {activeTab === "users" && "Manajemen Pengguna"}
                  {activeTab === "analytics" && "Analitik Website"}
                  {activeTab === "website" && "Editor Website"}
                  {activeTab === "messages" && "Pesan & Komunikasi"}
                  {activeTab === "settings" && "Pengaturan Sistem"}
                </h1>
                <p className="text-gray-500 mt-1">
                  {activeTab === "dashboard" && "Ringkasan aktivitas dan performa situs"}
                  {activeTab === "content" && "Kelola semua konten website dalam satu tempat"}
                  {activeTab === "property" && "Kelola properti dan listing yang ditampilkan"}
                  {activeTab === "users" && "Kelola akun pengguna dan hak akses"}
                  {activeTab === "analytics" && "Analisis performa dan aktivitas pengunjung"}
                  {activeTab === "website" && "Kustomisasi tampilan website dan koneksi backend"}
                  {activeTab === "messages" && "Kelola pesan dan komunikasi dengan pengguna"}
                  {activeTab === "settings" && "Konfigurasi pengaturan sistem"}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {activeTab === "content" && (
                  <Button className="gap-2">
                    <Plus size={16} />
                    Konten Baru
                  </Button>
                )}
                {activeTab === "property" && (
                  <Button className="gap-2">
                    <Plus size={16} />
                    Properti Baru
                  </Button>
                )}
                {activeTab === "website" && (
                  <Button variant="outline">
                    <Upload size={16} className="mr-2" />
                    Unggah Media
                  </Button>
                )}
              </div>
            </div>

            {/* Dashboard Components */}
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Ringkasan Statistik</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Data grafik statistik akan ditampilkan di sini</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Aktivitas Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className="rounded-full bg-gray-100 p-2">
                            <UserIcon />
                          </div>
                          <div>
                            <p className="font-medium">Admin melakukan perubahan konten</p>
                            <p className="text-sm text-gray-500">2 jam yang lalu</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Content Management */}
            {activeTab === "content" && <EnhancedContentManagement />}
            
            {/* Property Management */}
            {activeTab === "property" && <EnhancedPropertyManagement />}
            
            {/* User Management */}
            {activeTab === "users" && <UserManagement />}
            
            {/* Analytics */}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            
            {/* Website Editor */}
            {activeTab === "website" && <WebsiteEditor />}
            
            {/* Messaging Center */}
            {activeTab === "messages" && <MessagingCenter />}
            
            {/* System Settings */}
            {activeTab === "settings" && <SystemSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple User Icon Component
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default AdminPage;
