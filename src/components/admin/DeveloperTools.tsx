
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Book, Settings, AlertTriangle } from "lucide-react";
import DebugConsole from "./DebugConsole";
import ProjectKnowledge from "./ProjectKnowledge";

const DeveloperTools = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Developer Tools</h2>
      </div>
      
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Mode Pengembang</h3>
            <p className="text-sm text-amber-700">
              Developer tools ini hanya tersedia dalam mode pengembangan dan tidak akan muncul di website yang sudah dipublikasikan.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="debug" className="space-y-4">
        <TabsList>
          <TabsTrigger value="debug" className="flex items-center gap-2">
            <Code size={16} />
            Debug Console
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <Book size={16} />
            Pengetahuan Proyek
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="debug" className="space-y-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code size={18} />
                Debug Console
              </CardTitle>
              <CardDescription>
                Pantau console logs dan debug masalah dengan cepat
              </CardDescription>
            </CardHeader>
          </Card>
          <DebugConsole />
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book size={18} />
                Pengetahuan Proyek
              </CardTitle>
              <CardDescription>
                Kelola informasi khusus proyek yang ingin diingat oleh AI
              </CardDescription>
            </CardHeader>
          </Card>
          <ProjectKnowledge />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperTools;
