
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Save, Globe } from "lucide-react";
import BackendEditor from "./website/BackendEditor";
import PublicationPanel from "./PublicationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrontendEditor from "./website/FrontendEditor";
import { supabase } from "@/integrations/supabase/client";

const WebsiteEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("backend");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [settings, setSettings] = useState({
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
  });
  
  // Ambil pengaturan saat komponen dimuat
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'website_settings')
          .single();
        
        if (error) {
          if (error.code !== 'PGRST116') { // Ignore "not found" errors
            console.error('Error fetching settings:', error);
            throw error;
          }
        }
        
        if (data?.value) {
          setSettings(JSON.parse(data.value));
          
          const updatedAt = new Date(data.updated_at);
          const formattedTime = updatedAt.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          });
          setLastSaved(formattedTime);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleSaveBackendChanges = async () => {
    try {
      const now = new Date();
      const { data, error } = await supabase
        .from('settings')
        .upsert({
          key: 'website_settings',
          value: JSON.stringify(settings),
          updated_at: now.toISOString()
        }, { onConflict: 'key' })
        .select();
      
      if (error) {
        throw error;
      }
      
      const formattedTime = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      setHasUnsavedChanges(false);
      setLastSaved(formattedTime);
      
      toast({
        title: "Perubahan tersimpan!",
        description: "Perubahan pada backend berhasil disimpan ke database",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    } catch (err: any) {
      console.error('Error saving settings:', err);
      
      toast({
        title: "Gagal menyimpan perubahan",
        description: err.message || "Terjadi kesalahan saat menyimpan pengaturan",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Function to handle changes in configuration
  const handleConfigChange = (newSettings: any) => {
    setSettings(newSettings);
    setHasUnsavedChanges(true);
  };
  
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

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
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
                settings={settings} 
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
                settings={settings}
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
