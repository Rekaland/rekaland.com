
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save, PlayCircle, RefreshCw } from "lucide-react";

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
  const [jsCode, setJsCode] = useState(`// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  console.log('Website loaded successfully!');
  
  // Handle hero button click
  const heroButton = document.querySelector('.hero button');
  if (heroButton) {
    heroButton.addEventListener('click', function() {
      alert('Jelajahi katalog properti kami!');
    });
  }
});`);

  // Preview functionality
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreviewToggle = () => {
    setPreviewVisible(!previewVisible);
  };

  const getPreviewContent = () => {
    // Extract the body content from HTML
    const bodyMatch = htmlCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : htmlCode;
    
    // Create a preview document with the HTML, CSS and JS
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${bodyContent}
        <script>${jsCode}</script>
      </body>
      </html>
    `;
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <TabsList className="h-9">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handlePreviewToggle}
              className="h-9"
            >
              <PlayCircle size={16} className="mr-1" />
              {previewVisible ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button 
              size="sm" 
              onClick={onSave}
              className="h-9 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            >
              <Save size={16} className="mr-1" />
              Simpan
            </Button>
          </div>
        </div>

        <TabsContent value="html">
          <div className={previewVisible ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>index.html</span>
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
            
            {previewVisible && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Live Preview</span>
                    <Button size="sm" variant="ghost" onClick={() => setPreviewVisible(false)}>
                      <RefreshCw size={14} className="mr-1" />
                      Refresh
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md h-72 overflow-auto bg-white">
                    <iframe
                      title="preview"
                      srcDoc={getPreviewContent()}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="css">
          <div className={previewVisible ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>styles.css</span>
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
            
            {previewVisible && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Live Preview</span>
                    <Button size="sm" variant="ghost" onClick={() => setPreviewVisible(false)}>
                      <RefreshCw size={14} className="mr-1" />
                      Refresh
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md h-72 overflow-auto bg-white">
                    <iframe
                      title="preview"
                      srcDoc={getPreviewContent()}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="js">
          <div className={previewVisible ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>script.js</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    className="font-mono text-sm bg-gray-900 text-gray-100 p-4 h-72 overflow-auto"
                  />
                </div>
              </CardContent>
            </Card>
            
            {previewVisible && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Live Preview</span>
                    <Button size="sm" variant="ghost" onClick={() => setPreviewVisible(false)}>
                      <RefreshCw size={14} className="mr-1" />
                      Refresh
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md h-72 overflow-auto bg-white">
                    <iframe
                      title="preview"
                      srcDoc={getPreviewContent()}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={onSave}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
        >
          <Save size={16} className="mr-2" />
          Simpan Semua
        </Button>
      </div>
    </div>
  );
};

export default CodeEditor;
