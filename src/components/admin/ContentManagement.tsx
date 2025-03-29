
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageList } from "./content/PageList";
import { ContentEditor } from "./content/ContentEditor";
import { AddPageButton } from "./content/AddPageButton";

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

  const handleAddNewPage = () => {
    toast({
      title: "Halaman Baru",
      description: "Membuat halaman baru",
      duration: 1000,
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten</h2>
        <AddPageButton onClick={handleAddNewPage} />
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
              <CardTitle>Daftar Halaman</CardTitle>
            </CardHeader>
            <CardContent>
              <PageList 
                pages={pages} 
                onEditPage={handleEditPage} 
              />
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
              <ContentEditor initialContent={activeContent} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
