
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onSave: () => void;
}

const CodeEditor = ({ 
  htmlCode, 
  cssCode, 
  onHtmlChange,
  onCssChange,
  onSave
}: CodeEditorProps) => {
  const [activeTab, setActiveTab] = useState("html");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto mb-2">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>

        <TabsContent value="html">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>index.html</span>
                <Button 
                  size="sm" 
                  onClick={onSave}
                  className="h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={14} className="mr-1" />
                  Simpan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={htmlCode}
                  onChange={(e) => onHtmlChange(e.target.value)}
                  className="font-mono text-sm bg-gray-900 text-gray-100 p-4 h-72 overflow-auto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="css">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>styles.css</span>
                <Button 
                  size="sm" 
                  onClick={onSave}
                  className="h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={14} className="mr-1" />
                  Simpan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={cssCode}
                  onChange={(e) => onCssChange(e.target.value)}
                  className="font-mono text-sm bg-gray-900 text-gray-100 p-4 h-72 overflow-auto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="js">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>script.js</span>
                <Button 
                  size="sm" 
                  onClick={onSave}
                  className="h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={14} className="mr-1" />
                  Simpan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  defaultValue={`// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  console.log('Website loaded successfully!');
  
  // Handle hero button click
  const heroButton = document.querySelector('.hero button');
  if (heroButton) {
    heroButton.addEventListener('click', function() {
      alert('Jelajahi katalog properti kami!');
    });
  }
});`}
                  className="font-mono text-sm bg-gray-900 text-gray-100 p-4 h-72 overflow-auto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeEditor;
