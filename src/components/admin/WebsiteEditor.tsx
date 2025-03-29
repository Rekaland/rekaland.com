
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Globe, Save, Database, Layout } from "lucide-react";
import FrontendEditor from "./website/FrontendEditor";
import BackendEditor from "./website/BackendEditor";

const WebsiteEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("frontend");
  
  const handleSaveChanges = (type: string) => {
    toast({
      title: "Perubahan tersimpan!",
      description: `Perubahan pada ${type} berhasil disimpan`,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handlePublishChanges = () => {
    toast({
      title: "Website dipublikasikan!",
      description: "Website berhasil dipublikasikan ke server",
      className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Website Editor</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button 
            onClick={() => handleSaveChanges("website")}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          >
            <Save size={16} className="mr-2" />
            Simpan Perubahan
          </Button>
          <Button
            onClick={handlePublishChanges}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
          >
            <Globe size={16} className="mr-2" />
            Publikasikan
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="frontend" className="flex items-center gap-2">
            <Layout size={16} />
            Front-End
          </TabsTrigger>
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Database size={16} />
            Back-End
          </TabsTrigger>
        </TabsList>

        {/* Content based on active tab */}
        <TabsContent value="frontend" className="mt-2">
          <FrontendEditor />
        </TabsContent>

        <TabsContent value="backend" className="mt-2">
          <BackendEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteEditor;
