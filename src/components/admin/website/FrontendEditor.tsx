
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Eye, Pencil, Save, History, FileText, Code, Layout, Image as ImageIcon, Box, Type, Laptop, Smartphone, Palette, Layers, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import PageEditor from "./PageEditor";
import CodeEditor from "./CodeEditor";
import ChangeHistory from "./ChangeHistory";

const FrontendEditor = () => {
  const { toast } = useToast();
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [activePage, setActivePage] = useState("home");
  const [activeDevice, setActiveDevice] = useState("desktop");
  
  const [pages] = useState([
    { id: "home", name: "Beranda", path: "/" },
    { id: "about", name: "Tentang Kami", path: "/about" },
    { id: "products", name: "Produk", path: "/products" },
    { id: "contact", name: "Kontak", path: "/contact" }
  ]);
  
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REKALAND - Solusi Properti Anda</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header>
    <nav>
      <!-- Navigasi -->
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h1>REKALAND</h1>
      <p>Solusi properti terbaik untuk keluarga Indonesia</p>
      <button>Jelajahi Sekarang</button>
    </section>
    
    <!-- Konten lainnya -->
  </main>
  
  <footer>
    <!-- Footer -->
  </footer>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Main Styles */
body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.6;
}

.hero {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/hero.jpg');
  color: white;
  text-align: center;
  padding: 100px 20px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

button {
  background-color: #f97316;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}`);

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    toast({
      title: "Halaman berubah",
      description: `Menampilkan halaman ${pages.find(p => p.id === pageId)?.name}`,
      duration: 1500,
    });
  };

  const handleDeviceChange = (device: string) => {
    setActiveDevice(device);
    toast({
      title: "Tampilan berubah",
      description: `Menampilkan versi ${device === "desktop" ? "Desktop" : device === "tablet" ? "Tablet" : "Mobile"}`,
      duration: 1500,
    });
  };

  const handleSaveChanges = (type: string) => {
    toast({
      title: "Perubahan tersimpan!",
      description: `Perubahan pada ${type} berhasil disimpan`,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      duration: 1500,
    });
  };

  const handleRestore = (version: number) => {
    toast({
      title: "Versi dikembalikan!",
      description: `Berhasil mengembalikan ke versi ${version}`,
      duration: 1500,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Editor Area - Takes 3 columns on large screens */}
      <div className="lg:col-span-3 space-y-4">
        {/* Editor Type Tabs */}
        <Tabs value={editorMode} onValueChange={(v) => setEditorMode(v as "visual" | "code")}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <Layout size={16} />
                Editor Visual
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code size={16} />
                Editor Kode
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Tampilan:</span>
              <div className="flex bg-gray-100 rounded overflow-hidden">
                <Button 
                  size="sm" 
                  variant={activeDevice === "desktop" ? "default" : "ghost"} 
                  className="h-9 px-3"
                  onClick={() => handleDeviceChange("desktop")}
                >
                  <Laptop size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant={activeDevice === "tablet" ? "default" : "ghost"} 
                  className="h-9 px-3"
                  onClick={() => handleDeviceChange("tablet")}
                >
                  <Tablet size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant={activeDevice === "mobile" ? "default" : "ghost"} 
                  className="h-9 px-3"
                  onClick={() => handleDeviceChange("mobile")}
                >
                  <Smartphone size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Page Selection */}
          <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap mb-4 pb-1 hide-scrollbar">
            {pages.map(page => (
              <Button
                key={page.id}
                variant={activePage === page.id ? "default" : "outline"}
                size="sm"
                className="mr-2"
                onClick={() => handlePageChange(page.id)}
              >
                {page.name}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="bg-gray-50">
              <Pencil size={14} className="mr-1" /> Tambah
            </Button>
          </div>
          
          {/* Visual Editor Content */}
          <TabsContent value="visual" className="pt-0">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText size={18} className="mr-2" />
                    Editor Visual
                    <Badge variant="outline" className="ml-3">
                      {pages.find(p => p.id === activePage)?.path}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye size={14} className="mr-1" /> Preview
                  </Button>
                </CardTitle>
                <CardDescription>
                  Edit tampilan halaman menggunakan drag & drop
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  className={`border border-dashed border-gray-200 bg-gray-50 rounded-md ${
                    activeDevice === "desktop" ? "min-h-[500px]" : 
                    activeDevice === "tablet" ? "min-h-[500px] max-w-[768px] mx-auto" : 
                    "min-h-[600px] max-w-[375px] mx-auto"
                  }`}
                >
                  <PageEditor 
                    pageId={activePage} 
                    device={activeDevice}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Badge variant="outline" className="mr-2">
                    {activeDevice === "desktop" ? "Desktop" : activeDevice === "tablet" ? "Tablet" : "Mobile"} View
                  </Badge>
                  Terakhir diubah: 2 jam yang lalu
                </div>
                <Button 
                  onClick={() => handleSaveChanges("visual editor")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save size={16} className="mr-2" />
                  Simpan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Code Editor Content */}
          <TabsContent value="code" className="pt-0">
            <CodeEditor 
              htmlCode={htmlCode}
              cssCode={cssCode}
              onHtmlChange={setHtmlCode}
              onCssChange={setCssCode}
              onSave={() => handleSaveChanges("kode")}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sidebar - Takes 1 column */}
      <div className="lg:col-span-1 space-y-4">
        {/* Page Properties Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <FileText size={16} className="mr-2" />
              Properti Halaman
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Judul</Label>
              <Input 
                id="page-title" 
                defaultValue={pages.find(p => p.id === activePage)?.name} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="page-url">URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
                  rekaland.com
                </span>
                <Input 
                  id="page-url" 
                  className="rounded-l-none" 
                  defaultValue={pages.find(p => p.id === activePage)?.path} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="page-desc">Meta Description</Label>
              <Textarea 
                id="page-desc" 
                rows={3} 
                className="resize-none"
                placeholder="Tambahkan deskripsi SEO untuk halaman ini" 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="page-publish">Publikasikan</Label>
                <div className="text-xs text-gray-500">Tampilkan di website</div>
              </div>
              <Switch id="page-publish" defaultChecked />
            </div>
            
            <Button 
              onClick={() => handleSaveChanges("properti halaman")}
              className="w-full"
            >
              <Save size={16} className="mr-2" />
              Simpan Properti
            </Button>
          </CardContent>
        </Card>
        
        {/* Elements Panel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Layers size={16} className="mr-2" />
              Elemen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Drag & drop elemen ke halaman</p>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Heading", "Text", "Image", "Button", "Card", "List", "Video", "Form"].map((element) => (
                  <Button 
                    key={element} 
                    variant="outline" 
                    size="sm" 
                    className="flex justify-start h-auto py-2 px-3 text-left"
                    draggable
                  >
                    <Box size={14} className="mr-2 shrink-0" />
                    <span>{element}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Change History Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <History size={16} className="mr-2" />
              Riwayat Perubahan
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[250px] overflow-y-auto">
            <ChangeHistory onRestore={handleRestore} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Tablet icon since it's not in Lucide React
const Tablet = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
};

export default FrontendEditor;
