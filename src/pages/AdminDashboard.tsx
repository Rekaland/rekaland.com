
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, Users, FileText, BarChart3, Globe, Box, MessageSquare,
  PanelLeft, Save, ChevronRight, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ContentManagement from '@/components/admin/ContentManagement';
import PropertyManagement from '@/components/admin/PropertyManagement';
import UserManagement from '@/components/admin/UserManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import PublicationPanel from '@/components/admin/PublicationPanel';
import SettingsManagement from '@/components/admin/SettingsManagement';
import WebsiteEditor from '@/components/admin/WebsiteEditor';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const handlePublish = () => {
    toast.success("Perubahan berhasil dipublikasikan ke situs web!");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r shadow-sm transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && <h2 className="font-bold text-xl">Rekaland Admin</h2>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <div className="flex flex-col gap-2 p-3 flex-1">
          <Button 
            variant={activeTab === "content" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("content")}
          >
            <FileText size={18} />
            {!isCollapsed && <span className="ml-2">Konten</span>}
          </Button>
          
          <Button 
            variant={activeTab === "property" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("property")}
          >
            <Box size={18} />
            {!isCollapsed && <span className="ml-2">Properti</span>}
          </Button>
          
          <Button 
            variant={activeTab === "users" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} />
            {!isCollapsed && <span className="ml-2">Pengguna</span>}
          </Button>
          
          <Button 
            variant={activeTab === "analytics" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={18} />
            {!isCollapsed && <span className="ml-2">Analitik</span>}
          </Button>
          
          <Button 
            variant={activeTab === "website" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("website")}
          >
            <Globe size={18} />
            {!isCollapsed && <span className="ml-2">Website</span>}
          </Button>
          
          <Button 
            variant={activeTab === "settings" ? "default" : "ghost"} 
            className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} w-full`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            {!isCollapsed && <span className="ml-2">Pengaturan</span>}
          </Button>
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
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {activeTab === "content" && "Manajemen Konten"}
              {activeTab === "property" && "Manajemen Properti"}
              {activeTab === "users" && "Manajemen Pengguna"}
              {activeTab === "analytics" && "Dashboard Analitik"}
              {activeTab === "website" && "Editor Website"}
              {activeTab === "settings" && "Pengaturan"}
              {activeTab === "publish" && "Panel Publikasi"}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "content" && "Kelola semua konten website Anda"}
              {activeTab === "property" && "Kelola properti dan listing"}
              {activeTab === "users" && "Kelola akun pengguna dan akses"}
              {activeTab === "analytics" && "Pantau performa situs web"}
              {activeTab === "website" && "Edit tampilan dan pengalaman situs web"}
              {activeTab === "settings" && "Konfigurasi sistem"}
              {activeTab === "publish" && "Publikasikan perubahan ke situs live"}
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow">
            {activeTab === "content" && <ContentManagement />}
            {activeTab === "property" && <PropertyManagement />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "website" && <WebsiteEditor />}
            {activeTab === "settings" && <SettingsManagement />}
            {activeTab === "publish" && <PublicationPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
