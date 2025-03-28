
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Globe, Pencil, Save, History, FileText, Code, Layout, Image as ImageIcon } from "lucide-react";

const WebsiteEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("visual");
  const [changeHistory] = useState([
    { id: 1, page: "Beranda", user: "Admin User", timestamp: "12 Jun 2023 09:15", type: "Konten Update" },
    { id: 2, page: "Tentang Kami", user: "Admin User", timestamp: "10 Jun 2023 14:30", type: "Layout Update" },
    { id: 3, page: "Produk", user: "Admin User", timestamp: "8 Jun 2023 11:20", type: "Konten Update" },
    { id: 4, page: "Beranda", user: "Admin User", timestamp: "5 Jun 2023 16:45", type: "Gambar Update" },
    { id: 5, page: "Informasi", user: "Admin User", timestamp: "3 Jun 2023 10:05", type: "Konten Update" }
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

  const handleSaveChanges = (type: string) => {
    toast({
      title: "Perubahan tersimpan!",
      description: `Perubahan pada ${type} berhasil disimpan`,
      duration: 1000,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleViewChanges = (id: number) => {
    toast({
      title: "Melihat perubahan",
      description: `Menampilkan detail perubahan #${id}`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleRestoreChanges = (id: number) => {
    toast({
      title: "Mengembalikan perubahan",
      description: `Mengembalikan ke versi dari perubahan #${id}`,
      duration: 1000,
      className: "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Editor Website</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button 
            onClick={() => handleSaveChanges("editor")}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          >
            <Save size={16} className="mr-2" />
            Simpan Semua Perubahan
          </Button>
          <Button>
            <Globe size={16} className="mr-2" />
            Publikasikan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full md:w-auto">
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <Layout size={16} />
                Visual Editor
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code size={16} />
                Editor Kode
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === "visual" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Visual Editor</CardTitle>
                <CardDescription>Sunting tampilan website dengan drag and drop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-200 rounded-md p-4 h-96 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <Pencil className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">Editor Visual sedang dimuat...</p>
                    <div className="mt-4 flex gap-2 justify-center">
                      <Button>Masuk ke Editor</Button>
                      <Button variant="outline">
                        <ImageIcon size={16} className="mr-2" />
                        Kelola Media
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={() => handleSaveChanges("editor visual")}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save size={16} className="mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "code" && (
            <div className="space-y-6">
              <Tabs defaultValue="html">
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
                          onClick={() => handleSaveChanges("HTML")}
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
                          onChange={(e) => setHtmlCode(e.target.value)}
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
                          onClick={() => handleSaveChanges("CSS")}
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
                          onChange={(e) => setCssCode(e.target.value)}
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
                          onClick={() => handleSaveChanges("JavaScript")}
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
          )}
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} />
                Detail Halaman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="page-title">Judul Halaman</Label>
                  <Input id="page-title" defaultValue="Beranda" />
                </div>
                <div>
                  <Label htmlFor="page-slug">URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
                      rekaland.com/
                    </span>
                    <Input id="page-slug" className="rounded-l-none" defaultValue="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="page-desc">Meta Description</Label>
                  <Textarea 
                    id="page-desc" 
                    rows={3} 
                    defaultValue="REKALAND - Solusi properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau." 
                  />
                </div>
                <Button 
                  onClick={() => handleSaveChanges("detail halaman")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History size={18} />
                Riwayat Perubahan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {changeHistory.map(change => (
                  <div key={change.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{change.page}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{change.type}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">{change.user}</span>
                      <span className="text-gray-500">{change.timestamp}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleViewChanges(change.id)}
                      >
                        <Eye size={12} className="mr-1" />
                        Lihat
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleRestoreChanges(change.id)}
                      >
                        <History size={12} className="mr-1" />
                        Kembalikan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
