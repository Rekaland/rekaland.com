import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { MapPin, ArrowRight, Info, Check, Grid3X3, Home, Building, Map, Search, SlidersHorizontal, X } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const EmptyLotPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const productCategories = [
    {
      id: "all",
      title: "Semua Kavling",
      icon: <Grid3X3 className="h-5 w-5" />,
      description: "Lihat semua properti yang tersedia",
      path: "/produk"
    },
    {
      id: "empty",
      title: "Kavling Kosongan",
      icon: <Map className="h-5 w-5" />,
      description: "Tanah kavling siap bangun",
      path: "/produk/kavling-kosongan"
    },
    {
      id: "semifinished",
      title: "Kavling Bangunan",
      icon: <Building className="h-5 w-5" />,
      description: "Kavling dengan struktur bangunan dasar",
      path: "/produk/kavling-setengah-jadi"
    },
    {
      id: "ready",
      title: "Kavling Siap Huni",
      icon: <Home className="h-5 w-5" />,
      description: "Properti siap untuk ditempati",
      path: "/produk/kavling-siap-huni"
    }
  ];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Sample data for kavling kosongan
  const emptyLots = [
    {
      id: 1,
      title: "Kavling Premium Cisauk",
      location: "Cisauk, Tangerang",
      price: "Rp350 juta",
      area: "120 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Akses tol", "Dekat stasiun KRL", "SHM"]
    },
    {
      id: 2,
      title: "Kavling Strategis Serpong",
      location: "Serpong, Tangerang Selatan",
      price: "Rp425 juta",
      area: "150 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Dekat kampus", "Area komersial", "Bebas banjir"]
    },
    {
      id: 3,
      title: "Kavling Prima Cibubur",
      location: "Cibubur, Jakarta Timur",
      price: "Rp500 juta",
      area: "180 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Lingkungan asri", "Dekat tol", "Area berkembang"]
    },
    {
      id: 4,
      title: "Kavling Ekslusif BSD",
      location: "BSD City, Tangerang Selatan",
      price: "Rp600 juta",
      area: "200 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Kawasan elit", "Dekat mall", "Infrastruktur lengkap"]
    },
    {
      id: 5,
      title: "Kavling Investasi Lampung",
      location: "Cisarua, Lampung Selatan",
      price: "Rp300 juta",
      area: "150 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Prospek berkembang", "View pegunungan", "Udara sejuk"]
    },
    {
      id: 6,
      title: "Kavling Premium Bekasi",
      location: "Bekasi Timur",
      price: "Rp275 juta",
      area: "120 m²",
      type: "Kavling Kosongan",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Akses tol", "Dekat stasiun LRT", "Area berkembang"]
    }
  ];

  // Search and sort functionality
  const filteredEmptyLots = emptyLots
    .filter(property => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      
      if (property.title.toLowerCase().includes(searchLower)) return true;
      if (property.location.toLowerCase().includes(searchLower)) return true;
      if (property.features.some(feature => feature.toLowerCase().includes(searchLower))) return true;
      
      return false;
    })
    .sort((a, b) => {
      if (sortOption === "priceAsc") {
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      } else if (sortOption === "priceDesc") {
        return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      } else if (sortOption === "areaAsc") {
        return parseInt(a.area) - parseInt(b.area);
      } else if (sortOption === "areaDesc") {
        return parseInt(b.area) - parseInt(a.area);
      }
      return 0;
    });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-rekaland-orange">Beranda</Link>
              <span>/</span>
              <Link to="/produk" className="hover:text-rekaland-orange">Produk</Link>
              <span>/</span>
              <span className="text-rekaland-orange">Kavling Kosongan</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Kavling Kosongan</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Investasi tanah kavling dengan lokasi strategis dan sertifikat legal yang dapat Anda kembangkan sesuai kebutuhan dan keinginan.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative flex mb-4">
            <Input
              type="search"
              placeholder="Cari properti kavling kosongan..."
              className="w-full pr-12 rounded-full border-gray-300 focus:border-rekaland-orange focus:ring focus:ring-orange-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-3 rounded-l-none rounded-r-full bg-rekaland-orange hover:bg-orange-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                <TabsList>
                  <TabsTrigger value="grid" className="px-3 py-1">
                    <Grid3X3 className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Grid</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-3 py-1">
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="hidden sm:inline">List</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">Urutkan:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Terbaru</SelectItem>
                  <SelectItem value="priceAsc">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="priceDesc">Harga: Tinggi ke Rendah</SelectItem>
                  <SelectItem value="areaAsc">Luas: Kecil ke Besar</SelectItem>
                  <SelectItem value="areaDesc">Luas: Besar ke Kecil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <Card className="border-0 shadow-md overflow-hidden bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Kategori Properti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {productCategories.map((category) => (
                  <PropertyCategoryCard
                    key={category.id}
                    category={category}
                    isActive={category.id === "empty"}
                    onClick={() => navigate(category.path)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 rounded-lg border border-orange-100 dark:border-orange-800/40">
          <div className="flex items-start gap-3">
            <div className="bg-rekaland-orange bg-opacity-10 rounded-full p-1.5 mt-1">
              <Info className="h-5 w-5 text-rekaland-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tentang Kavling Kosongan</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Kavling kosongan adalah tanah yang telah dipersiapkan dengan fasilitas lingkungan seperti jalan, 
                saluran drainase, dan utilitas publik. Anda memiliki kebebasan penuh untuk membangun sesuai dengan 
                kebutuhan dan desain impian Anda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Sertifikat Hak Milik (SHM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Bebas banjir</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Akses mudah ke jalan utama</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">ROI tinggi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan {filteredEmptyLots.length} properti kavling kosongan
          </p>
        </div>

        <TabsContent value="grid" className={viewMode === "grid" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredEmptyLots.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className={viewMode === "list" ? "block" : "hidden"}>
          <div className="space-y-4 mb-12">
            {filteredEmptyLots.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 h-60 md:h-auto">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
                      {property.type}
                    </span>
                  </div>
                  <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                      <div className="flex items-center mb-3 text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <div className="flex justify-between mb-4">
                        <span className="font-bold text-rekaland-orange">{property.price}</span>
                        <span className="text-gray-500">{property.area}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-1 mb-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <Check size={14} className="text-green-500 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={() => navigate(`/produk/detail/${property.id}`)}
                        className="bg-gray-100 text-rekaland-black hover:bg-gray-200"
                        variant="outline"
                      >
                        Lihat Detail
                      </Button>
                      <Button 
                        className="bg-rekaland-orange hover:bg-orange-600 text-white"
                      >
                        Hubungi Agen <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="w-8 h-8 p-0">
              <span className="sr-only">Previous</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-rekaland-orange text-white border-rekaland-orange">
              <span className="sr-only">Page 1</span>
              <span>1</span>
            </Button>
            <Button variant="outline" size="sm" disabled className="w-8 h-8 p-0">
              <span className="sr-only">Next</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </nav>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmptyLotPage;
