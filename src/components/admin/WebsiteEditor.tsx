
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Save, Globe } from "lucide-react";
import BackendEditor from "./website/BackendEditor";
import PublicationPanel from "./PublicationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrontendEditor from "./website/FrontendEditor";
import { useSettings } from "@/hooks/useSettings";

const WebsiteEditor = () => {
  const [activeTab, setActiveTab] = useState("backend");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const { 
    settings, 
    setSettings, 
    loading, 
    lastSaved, 
    saveSettings 
  } = useSettings('website_settings');
  
  // Default settings if none are loaded
  const defaultSettings = {
    supabaseUrl: '',
    supabaseKey: '',
    siteTitle: 'Rekaland',
    siteDescription: 'Solusi properti terbaik untuk keluarga Indonesia',
    contactEmail: '',
    contactPhone: '',
    siteTheme: 'light',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  };
  
  // Use default settings if no settings are loaded
  useEffect(() => {
    if (!loading && !settings) {
      setSettings(defaultSettings);
    }
  }, [loading, settings]);
  
  const handleSaveBackendChanges = async () => {
    const result = await saveSettings(settings);
    if (result.success) {
      setHasUnsavedChanges(false);
    }
  };

  // Function to handle changes in configuration
  const handleConfigChange = (newSettings: any) => {
    setSettings(newSettings);
    setHasUnsavedChanges(true);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        <span className="ml-2">Memuat pengaturan...</span>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Website Editor</h2>
          {lastSaved && (
            <p className="text-sm text-gray-500">Terakhir disimpan: {lastSaved}</p>
          )}
          {hasUnsavedChanges && (
            <p className="text-sm text-amber-500 font-medium">Perubahan belum disimpan</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleSaveBackendChanges}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            disabled={!hasUnsavedChanges}
          >
            <Save size={16} className="mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Database size={16} />
            Backend Config
          </TabsTrigger>
          <TabsTrigger value="frontend" className="flex items-center gap-2">
            <Globe size={16} />
            Frontend Editor
          </TabsTrigger>
          <TabsTrigger value="publication" className="flex items-center gap-2">
            <Database size={16} />
            Publikasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backend" className="mt-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Database size={20} />
                <h3 className="text-lg font-medium">Backend Configuration</h3>
              </div>
              
              <BackendEditor 
                settings={settings || defaultSettings} 
                onConfigChange={handleConfigChange} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frontend" className="mt-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={20} />
                <h3 className="text-lg font-medium">Frontend Editor</h3>
              </div>
              
              <FrontendEditor 
                settings={settings || defaultSettings}
                onConfigChange={handleConfigChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publication" className="mt-2">
          <PublicationPanel hasUnsavedChanges={hasUnsavedChanges} lastSaved={lastSaved} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteEditor;
