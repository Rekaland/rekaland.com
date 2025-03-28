
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InformationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");

  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Panduan Lengkap Memilih Kavling yang Tepat untuk Investasi",
      excerpt: "Pahami faktor-faktor penting yang perlu dipertimbangkan sebelum membeli kavling untuk investasi jangka panjang.",
      category: "investasi",
      date: "12 Mei 2023",
      author: "Ahmad Fauzi",
      readTime: "8 menit",
      image: "https://i.pravatar.cc/300?img=40",
      tags: ["Investasi", "Kavling", "Tips Properti"],
    },
    {
      id: 2,
      title: "Mengenal Tahapan Pembangunan Rumah dari Pondasi hingga Finishing",
      excerpt: "Pelajari tahap demi tahap proses pembangunan rumah, biaya, dan hal-hal teknis yang perlu diperhatikan.",
      category: "pembangunan",
      date: "28 April 2023",
      author: "Siti Nurhayati",
      readTime: "10 menit",
      image: "https://i.pravatar.cc/300?img=41",
      tags: ["Pembangunan", "Konstruksi", "Biaya"],
    },
    {
      id: 3,
      title: "Tips Mengatur Keuangan untuk Membeli Rumah Pertama",
      excerpt: "Strategi cerdas mengelola keuangan agar bisa mewujudkan impian memiliki rumah sendiri lebih cepat.",
      category: "finansial",
      date: "15 Maret 2023",
      author: "Budi Santoso",
      readTime: "7 menit",
      image: "https://i.pravatar.cc/300?img=42",
      tags: ["Finansial", "KPR", "Perencanaan"],
    },
    {
      id: 4,
      title: "Perbandingan ROI: Kavling Kosongan vs Properti Siap Huni",
      excerpt: "Analisis mendalam tentang nilai investasi dan potensi keuntungan dari berbagai jenis properti.",
      category: "investasi",
      date: "2 Februari 2023",
      author: "Dewi Lestari",
      readTime: "9 menit",
      image: "https://i.pravatar.cc/300?img=43",
      tags: ["Investasi", "ROI", "Analisis"],
    },
    {
      id: 5,
      title: "Tren Desain Rumah yang Akan Populer di 2023",
      excerpt: "Ragam desain dan gaya arsitektur yang diprediksi akan menjadi tren di Indonesia tahun ini.",
      category: "desain",
      date: "20 Januari 2023",
      author: "Rini Puspita",
      readTime: "6 menit",
      image: "https://i.pravatar.cc/300?img=44",
      tags: ["Desain", "Arsitektur", "Tren"],
    },
  ];

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "semua" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Informasi & Artikel</h1>
          <p className="text-gray-600 max-w-3xl">
            Dapatkan berbagai informasi dan edukasi seputar properti, investasi kavling, dan tips memiliki rumah impian dari para ahli di bidangnya.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
            <div className="relative w-full md:w-1/3">
              <Input
                type="search"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2"
              />
            </div>
            <Tabs defaultValue="semua" value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="semua">Semua</TabsTrigger>
                <TabsTrigger value="investasi">Investasi</TabsTrigger>
                <TabsTrigger value="pembangunan">Pembangunan</TabsTrigger>
                <TabsTrigger value="finansial">Finansial</TabsTrigger>
                <TabsTrigger value="desain">Desain</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Featured Article */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <Card className="w-full overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-2">{filteredPosts[0].category.charAt(0).toUpperCase() + filteredPosts[0].category.slice(1)}</Badge>
                  <h2 className="text-2xl font-semibold mb-2">{filteredPosts[0].title}</h2>
                  <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center mr-4">
                      <User size={14} className="mr-1" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Link to={`/informasi/${filteredPosts[0].id}`}>
                    <Button>
                      Baca Selengkapnya
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="w-fit">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Badge>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <div key={index} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                      <Tag size={12} className="mr-1 text-rekaland-orange" />
                      {tag}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Link to={`/informasi/${post.id}`} className="text-rekaland-orange hover:underline text-sm flex items-center">
                    Baca artikel
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">Tidak ada artikel yang sesuai dengan pencarian Anda</h3>
            <p className="text-gray-500 mb-4">Coba dengan kata kunci atau kategori lain</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("semua");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}

        {/* Call-to-action section */}
        <div className="mt-16 bg-gradient-to-r from-rekaland-orange to-orange-500 rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tertarik dengan properti kami?</h2>
            <p className="mb-6">Temukan kavling atau rumah impian Anda di katalog produk kami yang lengkap.</p>
            <Link to="/produk">
              <Button variant="outline" className="bg-white text-rekaland-orange hover:bg-gray-100">
                Lihat Katalog Produk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InformationPage;
