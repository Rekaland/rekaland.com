
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pencil, Eye, LayoutGrid, Image, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageList } from "./content/PageList";
import { ContentEditor } from "./content/ContentEditor";
import { AddPageButton } from "./content/AddPageButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Real content from the actual website pages
const websitePages = [
  { 
    id: 1, 
    title: "Beranda", 
    slug: "/", 
    lastEdited: "12 Jun 2023", 
    status: "Published",
    content: {
      title: "REKALAND - Solusi Properti untuk Keluarga Indonesia",
      sections: [
        { type: "hero", title: "Temukan Properti Impian Anda", description: "Solusi properti terbaik untuk keluarga Indonesia dengan berbagai pilihan" },
        { type: "categories", title: "Kategori Properti" },
        { type: "featured", title: "Properti Unggulan" },
        { type: "testimonials", title: "Testimoni Pelanggan" },
        { type: "cta", title: "Hubungi Kami Sekarang" }
      ],
      meta: {
        description: "REKALAND - Solusi properti terbaik untuk keluarga Indonesia dengan pilihan kavling dan properti di lokasi strategis."
      }
    }
  },
  { 
    id: 2, 
    title: "Tentang Kami", 
    slug: "/tentang", 
    lastEdited: "5 Jun 2023", 
    status: "Published",
    content: {
      title: "Tentang REKALAND",
      sections: [
        { type: "hero", title: "Tentang Kami", description: "Mengenal lebih dekat dengan REKALAND" },
        { type: "about", title: "Visi & Misi", description: "Menjadi solusi properti terbaik untuk keluarga Indonesia" },
        { type: "team", title: "Tim Kami" },
        { type: "history", title: "Sejarah Perusahaan" }
      ],
      meta: {
        description: "Tentang REKALAND - Penyedia properti terpercaya dengan pengalaman di industri properti Indonesia."
      }
    }
  },
  { 
    id: 3, 
    title: "Produk", 
    slug: "/produk", 
    lastEdited: "8 Jun 2023", 
    status: "Published",
    content: {
      title: "Produk REKALAND",
      sections: [
        { type: "hero", title: "Produk Kami", description: "Pilihan properti untuk kebutuhan Anda" },
        { type: "products", title: "Katalog Produk" }
      ],
      meta: {
        description: "Produk REKALAND - Kavling, rumah dan properti dengan berbagai pilihan sesuai kebutuhan Anda."
      }
    }
  },
  { 
    id: 4, 
    title: "Kavling Kosongan", 
    slug: "/produk/kavling-kosongan", 
    lastEdited: "10 Jun 2023", 
    status: "Published",
    content: {
      title: "Kavling Kosongan",
      sections: [
        { type: "hero", title: "Kavling Kosongan", description: "Tanah kavling siap bangun untuk rumah impian Anda" },
        { type: "features", title: "Keunggulan" },
        { type: "listings", title: "Lokasi Tersedia" }
      ],
      meta: {
        description: "Kavling Kosongan REKALAND - Tanah kavling siap bangun di lokasi strategis dengan sertifikat SHM."
      }
    }
  },
  { 
    id: 5, 
    title: "Informasi", 
    slug: "/informasi", 
    lastEdited: "7 Jun 2023", 
    status: "Published",
    content: {
      title: "Informasi",
      sections: [
        { type: "hero", title: "Pusat Informasi", description: "Berita dan informasi terkini dari REKALAND" },
        { type: "news", title: "Berita Terbaru" },
        { type: "faq", title: "Pertanyaan Umum" }
      ],
      meta: {
        description: "Informasi REKALAND - Berita terbaru, FAQ, dan informasi penting untuk calon pembeli properti."
      }
    }
  }
];

const ContentManagement = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState(websitePages);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pages");

  const [activeContent, setActiveContent] = useState({
    title: "Beranda",
    slug: "",
    content: "Selamat datang di REKALAND, solusi properti terbaik untuk keluarga Indonesia. Kami menyediakan berbagai pilihan properti mulai dari kavling kosongan, setengah jadi, hingga siap huni dengan harga kompetitif dan lokasi strategis.",
    metaDescription: "REKALAND - Solusi properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau."
  });
  
  // Update active content when selected page changes
  useEffect(() => {
    const page = pages.find(p => p.id === selectedPage);
    if (page) {
      setActiveContent({
        title: page.title,
        slug: page.slug.replace("/", ""),
        content: page.content.sections.map(s => s.title + ": " + (s.description || "")).join("\n\n"),
        metaDescription: page.content.meta.description
      });
    }
  }, [selectedPage, pages]);
  
  const handleEditPage = (id: number) => {
    setSelectedPage(id);
    setActiveTab("edit");
    
    toast({
      title: "Mengedit halaman",
      description: `Membuka halaman: ${pages.find(p => p.id === id)?.title}`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handlePreviewPage = (id: number) => {
    setSelectedPage(id);
    setIsPreviewOpen(true);
    
    toast({
      title: "Melihat pratinjau",
      description: `Membuka pratinjau halaman: ${pages.find(p => p.id === id)?.title}`,
      duration: 1000,
    });
  };

  const handleAddNewPage = () => {
    toast({
      title: "Halaman Baru",
      description: "Membuat halaman baru",
      duration: 1000,
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  const handleSaveContent = (content) => {
    setPages(prevPages => 
      prevPages.map(p => 
        p.id === selectedPage 
          ? {
              ...p,
              content: {
                ...p.content,
                title: content.title,
                meta: {
                  ...p.content.meta,
                  description: content.metaDescription
                }
              },
              lastEdited: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            } 
          : p
      )
    );
    
    toast({
      title: "Konten tersimpan",
      description: "Perubahan pada konten berhasil disimpan",
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
    });
  };

  // Get current page content for preview
  const currentPage = pages.find(p => p.id === selectedPage);
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Kelola Konten Website</h2>
          <p className="text-sm text-gray-500">Edit dan publikasikan konten yang akan ditampilkan di website</p>
        </div>
        <AddPageButton onClick={handleAddNewPage} />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <LayoutGrid size={16} />
            Daftar Halaman
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Pencil size={16} />
            Edit Konten
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye size={16} />
            Pratinjau
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Halaman Website</CardTitle>
              <CardDescription>Kelola semua halaman yang ditampilkan di website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pages.map(page => (
                    <Card key={page.id} className="overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                        {page.slug === "/" ? (
                          <Home className="h-12 w-12 text-blue-400" />
                        ) : (
                          <FileText className="h-12 w-12 text-blue-400" />
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1 flex items-center justify-between">
                          {page.title}
                          <Badge variant="outline" className="ml-2">
                            {page.status === 'Published' ? 'Dipublikasi' : 'Draft'}
                          </Badge>
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{page.slug}</p>
                        <p className="text-sm mb-4">
                          {page.content.sections[0]?.description?.substring(0, 60)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Diperbarui: {page.lastEdited}</span>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handlePreviewPage(page.id)}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditPage(page.id)}
                            >
                              <Pencil size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add New Page Card */}
                  <Card className="overflow-hidden border-dashed">
                    <div className="h-32 bg-gray-50 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FileText className="h-10 w-10 mx-auto mb-2" />
                        <span>Tambah Halaman Baru</span>
                      </div>
                    </div>
                    <CardContent className="p-4 flex justify-center">
                      <Button onClick={handleAddNewPage} variant="outline" className="w-full">
                        Tambah Halaman
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Edit Konten: {currentPage?.title}</span>
                <Badge variant="outline">
                  {currentPage?.slug}
                </Badge>
              </CardTitle>
              <CardDescription>Sunting konten halaman website</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditor 
                initialContent={activeContent} 
                onSave={handleSaveContent} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Pratinjau: {currentPage?.title}</span>
                <Badge>{currentPage?.slug}</Badge>
              </CardTitle>
              <CardDescription>Tampilan halaman di website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-100 border-b p-2 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="10" y1="15" x2="10" y2="9" />
                        <line x1="14" y1="15" x2="14" y2="9" />
                      </svg>
                    </Button>
                  </div>
                  <div className="border rounded bg-white px-2 py-1 text-sm flex-1 mx-4 text-gray-600">
                    rekaland.com{currentPage?.slug}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </div>
                
                {/* Website Preview Content */}
                <div className="bg-white p-0 h-[500px] overflow-auto">
                  {currentPage?.slug === "/" ? (
                    <div>
                      {/* Hero section */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 px-4">
                        <h1 className="text-4xl font-bold mb-4">{currentPage.content.sections[0]?.title}</h1>
                        <p className="max-w-2xl mx-auto mb-8">{currentPage.content.sections[0]?.description}</p>
                        <Button className="bg-white text-blue-700 hover:bg-gray-100">Jelajahi Properti</Button>
                      </div>
                      
                      {/* Categories section */}
                      <div className="py-16 px-4 max-w-7xl mx-auto">
                        <h2 className="text-3xl font-semibold text-center mb-12">{currentPage.content.sections[1]?.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Kosongan</h3>
                              <p className="text-gray-600 mb-4">Tanah kavling siap bangun untuk rumah impian Anda</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Setengah Jadi</h3>
                              <p className="text-gray-600 mb-4">Rumah setengah jadi yang bisa disesuaikan</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Siap Huni</h3>
                              <p className="text-gray-600 mb-4">Rumah siap huni dengan desain modern</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Featured section preview */}
                      <div className="py-16 px-4 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                          <h2 className="text-3xl font-semibold text-center mb-12">{currentPage.content.sections[2]?.title}</h2>
                          {/* Featured properties would go here */}
                        </div>
                      </div>
                    </div>
                  ) : currentPage?.slug === "/tentang" ? (
                    <div>
                      {/* About page preview */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 px-4">
                        <h1 className="text-4xl font-bold mb-4">{currentPage.content.sections[0]?.title}</h1>
                        <p className="max-w-2xl mx-auto">{currentPage.content.sections[0]?.description}</p>
                      </div>
                      
                      <div className="py-16 px-4 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold mb-6">{currentPage.content.sections[1]?.title}</h2>
                        <p className="mb-8">{currentPage.content.sections[1]?.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-medium mb-3">Visi</h3>
                            <p>Menjadi perusahaan properti terdepan yang memberikan solusi hunian berkualitas untuk seluruh masyarakat Indonesia</p>
                          </div>
                          <div className="bg-indigo-50 p-6 rounded-lg">
                            <h3 className="text-xl font-medium mb-3">Misi</h3>
                            <p>Menyediakan properti berkualitas dengan harga kompetitif dan lokasi strategis untuk memenuhi kebutuhan konsumen</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : currentPage?.slug === "/produk" ? (
                    <div>
                      {/* Products page preview */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 px-4">
                        <h1 className="text-4xl font-bold mb-4">{currentPage.content.sections[0]?.title}</h1>
                        <p className="max-w-2xl mx-auto">{currentPage.content.sections[0]?.description}</p>
                      </div>
                      
                      <div className="py-16 px-4 max-w-7xl mx-auto">
                        <h2 className="text-3xl font-semibold text-center mb-12">{currentPage.content.sections[1]?.title}</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Kosongan</h3>
                              <p className="text-gray-600 mb-4">Tanah kavling siap bangun untuk rumah impian Anda</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Setengah Jadi</h3>
                              <p className="text-gray-600 mb-4">Rumah setengah jadi yang bisa disesuaikan</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                          <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                              <h3 className="font-medium text-lg mb-2">Kavling Siap Huni</h3>
                              <p className="text-gray-600 mb-4">Rumah siap huni dengan desain modern</p>
                              <Button variant="outline" className="w-full">Lihat Detail</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <h1 className="text-3xl font-bold mb-4">{currentPage?.title}</h1>
                      <p>Pratinjau untuk {currentPage?.slug}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("edit")}
                >
                  <Pencil size={16} className="mr-2" />
                  Edit Halaman
                </Button>
                <div>
                  <Button 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast({
                        title: "Halaman dipublikasikan!",
                        description: `Halaman ${currentPage?.title} berhasil dipublikasikan ke website`,
                      });
                    }}
                  >
                    Publikasikan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
