
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Save, Globe } from "lucide-react";
import BackendEditor from "./website/BackendEditor";
import PublicationPanel from "./PublicationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrontendEditor from "./website/FrontendEditor";

const WebsiteEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("backend");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  const handleSaveBackendChanges = () => {
    setHasUnsavedChanges(false);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    setLastSaved(formattedTime);
    
    toast({
      title: "Perubahan tersimpan!",
      description: "Perubahan pada backend berhasil disimpan",
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  // Function to handle changes in configuration
  const handleConfigChange = () => {
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
              
              <BackendEditor onConfigChange={handleConfigChange} />
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
              
              <FrontendEditor />
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
