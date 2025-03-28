
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Eye, Save, FileText, Plus, Search } from "lucide-react";

const ContentManagement = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState([
    { id: 1, title: "Beranda", slug: "/", lastEdited: "12 Jun 2023", status: "Published" },
    { id: 2, title: "Tentang Kami", slug: "/tentang", lastEdited: "5 Jun 2023", status: "Published" },
    { id: 3, title: "Produk", slug: "/produk", lastEdited: "8 Jun 2023", status: "Published" },
    { id: 4, title: "Kavling Kosongan", slug: "/produk/kavling-kosongan", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 5, title: "Kavling Setengah Jadi", slug: "/produk/kavling-setengah-jadi", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 6, title: "Kavling Siap Huni", slug: "/produk/kavling-siap-huni", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 7, title: "Informasi", slug: "/informasi", lastEdited: "7 Jun 2023", status: "Published" }
  ]);

  const [activeContent, setActiveContent] = useState({
    title: "Beranda",
    slug: "",
    content: "Selamat datang di REKALAND, solusi properti terbaik untuk keluarga Indonesia. Kami menyediakan berbagai pilihan properti mulai dari kavling kosongan, setengah jadi, hingga siap huni dengan harga kompetitif dan lokasi strategis.",
    metaDescription: "REKALAND - Solusi properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau."
  });
  
  const handleSaveContent = () => {
    toast({
      title: "Konten tersimpan!",
      description: "Perubahan pada konten berhasil disimpan",
      duration: 1000,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleEditPage = (id: number) => {
    const page = pages.find(p => p.id === id);
    setActiveContent({
      ...activeContent,
      title: page?.title || "",
      slug: page?.slug.replace("/", "") || ""
    });
    
    toast({
      title: "Mengedit halaman",
      description: `Membuka halaman: ${page?.title}`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleViewPage = (id: number) => {
    const page = pages.find(p => p.id === id);
    toast({
      title: "Melihat halaman",
      description: `Membuka preview halaman: ${page?.title}`,
      duration: 1000,
      className: "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten</h2>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
          <Plus size={16} className="mr-2" />
          Tambah Halaman Baru
        </Button>
      </div>
      
      <Tabs defaultValue="pages">
        <TabsList className="mb-4">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText size={16} />
            Halaman
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Pencil size={16} />
            Edit Konten
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Daftar Halaman</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari halaman..."
                    className="pl-8 w-full sm:w-[200px] h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Terakhir Diubah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map(page => (
                      <TableRow key={page.id} className="hover:bg-gray-50">
                        <TableCell>{page.id}</TableCell>
                        <TableCell>{page.title}</TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell>{page.lastEdited}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {page.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPage(page.id)}
                            >
                              <Pencil size={14} className="mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewPage(page.id)}
                            >
                              <Eye size={14} className="mr-1" />
                              Lihat
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Konten</CardTitle>
              <CardDescription>Sunting halaman website</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="page-title">Judul Halaman</Label>
                  <Input 
                    id="page-title" 
                    value={activeContent.title}
                    onChange={(e) => setActiveContent({...activeContent, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="page-slug">URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
                      example.com/
                    </span>
                    <Input 
                      id="page-slug" 
                      className="rounded-l-none" 
                      value={activeContent.slug}
                      onChange={(e) => setActiveContent({...activeContent, slug: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="page-content">Konten</Label>
                  <Textarea 
                    id="page-content" 
                    rows={10} 
                    value={activeContent.content}
                    onChange={(e) => setActiveContent({...activeContent, content: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>SEO Meta Description</Label>
                  <Textarea 
                    rows={3} 
                    value={activeContent.metaDescription}
                    onChange={(e) => setActiveContent({...activeContent, metaDescription: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Perubahan dibatalkan",
                        description: "Perubahan pada konten telah dibatalkan",
                        duration: 1000,
                        className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
                      });
                    }}
                  >
                    Batal
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveContent();
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save size={16} className="mr-2" />
                    Simpan & Publikasikan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
