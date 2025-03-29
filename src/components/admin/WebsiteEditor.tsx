
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Save } from "lucide-react";
import BackendEditor from "./website/BackendEditor";

const WebsiteEditor = () => {
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    toast({
      title: "Perubahan tersimpan!",
      description: "Perubahan pada backend berhasil disimpan",
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Backend Editor</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleSaveChanges}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          >
            <Save size={16} className="mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Database size={20} />
            <h3 className="text-lg font-medium">Backend Configuration</h3>
          </div>
          
          <BackendEditor />
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteEditor;
