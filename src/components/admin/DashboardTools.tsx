
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileCode, Import } from "lucide-react";
import ContentImporter from "./ContentImporter";
import DebugConsole from "./DebugConsole";

const DashboardTools = () => {
  const [activeTab, setActiveTab] = useState("importer");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tools & Utilities</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="importer" className="flex items-center gap-2">
            <Import size={16} />
            Content Importer
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center gap-2">
            <FileCode size={16} />
            Debug Console
          </TabsTrigger>
        </TabsList>

        <TabsContent value="importer">
          <ContentImporter />
        </TabsContent>

        <TabsContent value="debug">
          <DebugConsole />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTools;
