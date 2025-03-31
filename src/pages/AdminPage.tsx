import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '../hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings, Users, FileText, BarChart3, Globe, Box, 
  PanelLeft, Save, ChevronRight, ChevronLeft, Home,
  MessageSquare, Upload, Bell, Search, Plus,
  ArrowUpRight, Eye, RefreshCw, ArrowUp, ArrowDown
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
import ContentManagement from '@/components/admin/ContentManagement';

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [lastPublished, setLastPublished] = useState("15 Jun 2023 13:45");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifikasi apakah pengguna sudah login dan memiliki akses admin
    const checkAdminAccess = async () => {
      setIsLoading(true);
      
      console.log("Checking admin access:", { isAuthenticated, isAdmin, user });
      
      if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to login");
        toast({
          title: "Akses Ditolak",
          description: "Anda harus login terlebih dahulu",
          variant: "destructive",
        });
        navigate("/login?redirect_to=/admin");
        return;
      }
      
      if (!isAdmin) {
        console.log("User not admin, redirecting to home");
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses ke halaman admin",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      // Auto-collapse sidebar on mobile
      if (isMobile) {
        setIsCollapsed(true);
      }
      
      toast({
        title: "Selamat datang, Admin!",
        description: "Anda dapat mengelola konten dan properti website Rekaland disini.",
      });
      
      setIsLoading(false);
    };
    
    checkAdminAccess();
  }, [isAuthenticated, isAdmin, navigate, toast, isMobile, user]);

  const handlePublish = () => {
    if (!isSupabaseConnected) {
      toast({
        title: "Koneksi diperlukan",
        description: "Hubungkan dengan Supabase terlebih dahulu untuk publikasi",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Perubahan dipublikasikan!",
      description: "Seluruh perubahan berhasil dipublikasikan ke website",
      className: "bg-green-600 text-white"
    });
    
    setLastPublished(new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rekaland-orange mx-auto mb-4"></div>
          <p className="text-xl font-medium">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Return null to avoid flickering before redirect
  }

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
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2 mb-1">
              <span className="text-gray-500">Status Supabase:</span>
              <Badge variant={isSupabaseConnected ? "outline" : "outline"} className={isSupabaseConnected ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                {isSupabaseConnected ? "Terhubung" : "Tidak terhubung"}
              </Badge>
            </div>
            
            {!isCollapsed && (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full mb-2 text-xs"
                onClick={() => {
                  setIsSupabaseConnected(!isSupabaseConnected);
                  if (!isSupabaseConnected) {
                    toast({
                      title: "Terhubung ke Supabase!",
                      description: "Koneksi ke Supabase berhasil dibuat",
                      className: "bg-green-600 text-white",
                    });
                  } else {
                    toast({
                      title: "Koneksi terputus",
                      description: "Koneksi ke Supabase telah terputus",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <RefreshCw size={14} className="mr-1" />
                {isSupabaseConnected ? "Putuskan" : "Hubungkan"}
              </Button>
            )}

            <Button 
              variant="default" 
              onClick={handlePublish}
              className={`w-full flex items-center justify-${isCollapsed ? 'center' : 'between'} bg-green-600 hover:bg-green-700`}
            >
              <Upload size={18} />
              {!isCollapsed && <span className="ml-2">Publikasikan</span>}
            </Button>
          </div>
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
              <div className="space-y-6">
                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Pengunjung</p>
                          <p className="text-3xl font-bold">1,284</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <span className="flex items-center text-green-600">
                          <ArrowUp size={14} className="mr-1" />
                          12.5%
                        </span>
                        <span className="text-gray-500 ml-2">vs bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Properti</p>
                          <p className="text-3xl font-bold">24</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Box size={20} className="text-orange-600" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <span className="flex items-center text-green-600">
                          <ArrowUp size={14} className="mr-1" />
                          3 properti
                        </span>
                        <span className="text-gray-500 ml-2">baru minggu ini</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Pesan</p>
                          <p className="text-3xl font-bold">18</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <MessageSquare size={20} className="text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <span className="flex items-center text-amber-600">
                          <ArrowUpRight size={14} className="mr-1" />
                          5 belum dibaca
                        </span>
                        <span className="text-gray-500 ml-2">perlu ditindak</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Status Publikasi</p>
                          <p className="text-base font-bold">
                            <Badge variant="outline" className={isSupabaseConnected ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                              {isSupabaseConnected ? "Terhubung" : "Tidak terhubung"}
                            </Badge>
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Globe size={20} className="text-green-600" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <span className="text-gray-600">
                          Publikasi terakhir: {lastPublished}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Statistics and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Statistik Kunjungan</CardTitle>
                      <CardDescription>Jumlah pengunjung website dalam 7 hari terakhir</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <div className="w-full h-full flex flex-col">
                          <div className="flex-1 flex">
                            {/* Simplified Chart */}
                            <div className="w-10 flex flex-col justify-between text-xs text-gray-500 pt-2 pb-4">
                              <div>1500</div>
                              <div>1000</div>
                              <div>500</div>
                              <div>0</div>
                            </div>
                            <div className="flex-1 grid grid-cols-7 gap-2 items-end pb-4">
                              <div className="flex flex-col items-center group">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '35%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Sen</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Sel</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '45%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Rab</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Kam</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '85%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Jum</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Sab</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-blue-500 rounded-t" style={{height: '50%'}}></div>
                                <span className="text-xs mt-1 text-gray-500">Min</span>
                              </div>
                            </div>
                          </div>
                          <div className="h-px bg-gray-200 w-full"></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span className="text-sm text-gray-500">Pengunjung</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-sm">
                          <Eye size={14} />
                          Lihat Detail
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
                      <CardDescription>Log aktivitas pada website</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="rounded-full bg-blue-100 p-2">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Halaman beranda diperbarui</p>
                            <p className="text-sm text-gray-500">2 jam yang lalu</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="rounded-full bg-green-100 p-2">
                            <Upload size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Website dipublikasikan</p>
                            <p className="text-sm text-gray-500">1 hari yang lalu</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="rounded-full bg-orange-100 p-2">
                            <Box size={16} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Properti baru ditambahkan</p>
                            <p className="text-sm text-gray-500">2 hari yang lalu</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-indigo-100 p-2">
                            <MessageSquare size={16} className="text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">5 pesan baru diterima</p>
                            <p className="text-sm text-gray-500">3 hari yang lalu</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        Lihat semua aktivitas
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Quick Actions & Website Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                      <CardDescription>Akses cepat ke fitur utama</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("content")}
                        >
                          <FileText size={24} className="text-blue-600" />
                          <span>Edit Konten</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("property")}
                        >
                          <Box size={24} className="text-orange-600" />
                          <span>Kelola Properti</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("messages")}
                        >
                          <MessageSquare size={24} className="text-indigo-600" />
                          <span>Lihat Pesan</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("website")}
                        >
                          <Globe size={24} className="text-green-600" />
                          <span>Edit Website</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>Pratinjau Website</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Online
                        </Badge>
                      </CardTitle>
                      <CardDescription>Tampilan website saat ini</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="border rounded overflow-hidden">
                        <div className="bg-gray-100 border-b p-2 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <div className="flex-1 text-center text-xs text-gray-500">rekaland.com</div>
                        </div>
                        <div className="aspect-video bg-gray-50 border-b relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                            <div className="text-center">
                              <h2 className="text-2xl font-bold mb-2">REKALAND</h2>
                              <p>Solusi properti terbaik untuk keluarga Indonesia</p>
                              <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-100">Jelajahi</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-500">Terakhir dipublikasikan: {lastPublished}</p>
                        <Button size="sm">
                          <Eye size={14} className="mr-2" />
                          Lihat Website
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}

            {/* Content Management */}
            {activeTab === "content" && <ContentManagement />}
            
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

export default AdminPage;
