
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map, Search } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Parse search query from URL on page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
      
      // Jika user sudah login, tambahkan ke riwayat pencarian
      if (isAuthenticated && user) {
        const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
        
        // Cek jika pencarian ini belum ada di riwayat
        if (!searchHistory.some((item: any) => 
          item.type === 'search' && item.keyword === search)) {
          
          const historyItem = { 
            id: Date.now(), 
            type: 'search', 
            keyword: search, 
            timestamp: new Date().toISOString() 
          };
          
          searchHistory.unshift(historyItem);
          
          // Batasi riwayat pencarian hingga 20 item
          if (searchHistory.length > 20) searchHistory.pop();
          
          localStorage.setItem(`searchHistory_${user.email}`, JSON.stringify(searchHistory));
        }
      }
    }
  }, [location.search, isAuthenticated, user]);

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
    
    // Set active tab based on path
    const path = location.pathname;
    if (path === "/produk") setActiveTab("all");
    else if (path.includes("kavling-kosongan")) setActiveTab("empty");
    else if (path.includes("kavling-setengah-jadi")) setActiveTab("semifinished");
    else if (path.includes("kavling-siap-huni")) setActiveTab("ready");
    
    // Menyimpan semua properti dalam localStorage untuk diakses dari halaman lain
    localStorage.setItem('allProperties', JSON.stringify(properties));
  }, [location.pathname]);

  // Sample properties data
  const properties = [
    {
      id: 1,
      title: "Properti Premium Jakarta",
      location: "Jakarta Selatan",
      type: "Kavling Kosongan",
      price: "Rp 350jt",
      area: "120 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=1",
      features: ["Akses tol", "Dekat stasiun", "SHM"]
    },
    {
      id: 2,
      title: "Kavling Strategis BSD",
      location: "Tangerang Selatan",
      type: "Kavling Kosongan",
      price: "Rp 400jt",
      area: "150 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=2",
      features: ["Bebas banjir", "Lokasi premium", "ROI tinggi"]
    },
    {
      id: 3,
      title: "Rumah Setengah Jadi Bekasi",
      location: "Bekasi",
      type: "Kavling Bangunan",
      price: "Rp 550jt",
      area: "180 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=3",
      features: ["Struktur kokoh", "Desain modern", "Lingkungan asri"]
    },
    {
      id: 4,
      title: "Villa Siap Huni Cisarua",
      location: "Cisarua, Lampung Selatan",
      type: "Kavling Siap Huni",
      price: "Rp 1.2M",
      area: "250 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=4",
      features: ["Fully furnished", "View pegunungan", "Keamanan 24 jam"]
    },
    {
      id: 5,
      title: "Kavling Premium Lampung",
      location: "Lampung Selatan",
      type: "Kavling Kosongan",
      price: "Rp 280jt",
      area: "110 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=5",
      features: ["Akses mudah", "Sertifikat SHM", "Lokasi berkembang"]
    },
    {
      id: 6,
      title: "Rumah Modern Cisarua",
      location: "Cisarua, Lampung Selatan",
      type: "Kavling Siap Huni",
      price: "Rp 950jt",
      area: "220 m²",
      image: "https://source.unsplash.com/random/300x200?property&sig=6",
      features: ["3 kamar tidur", "2 kamar mandi", "Kolam renang"]
    }
  ];

  // Function to handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Jika user sudah login, tambahkan ke riwayat pencarian
    if (isAuthenticated && user && searchTerm) {
      const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
      
      const historyItem = { 
        id: Date.now(), 
        type: 'search', 
        keyword: searchTerm, 
        timestamp: new Date().toISOString() 
      };
      
      searchHistory.unshift(historyItem);
      
      // Batasi riwayat pencarian hingga 20 item
      if (searchHistory.length > 20) searchHistory.pop();
      
      localStorage.setItem(`searchHistory_${user.email}`, JSON.stringify(searchHistory));
    } else if (!isAuthenticated && searchTerm) {
      // Jika belum login dan mencoba mencari, simpan kata kunci untuk disimpan setelah login
      localStorage.setItem('lastSearchKeyword', searchTerm);
    }
    
    navigate(`/produk?search=${encodeURIComponent(searchTerm)}`);
  };

  // Function to check if property matches search term
  const matchesSearch = (property: any) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Check title, location, type
    if (property.title.toLowerCase().includes(searchLower)) return true;
    if (property.location.toLowerCase().includes(searchLower)) return true;
    if (property.type.toLowerCase().includes(searchLower)) return true;
    
    // Check features
    if (property.features.some((feature: string) => 
      feature.toLowerCase().includes(searchLower))) return true;
    
    // Check price text
    if (property.price.toLowerCase().includes(searchLower)) return true;
    
    return false;
  };

  // Filter properties based on active tab AND search term
  const filteredProperties = properties
    .filter(property => {
      // Filter by category
      if (activeTab === "all") return true;
      if (activeTab === "empty" && property.type === "Kavling Kosongan") return true;
      if (activeTab === "semifinished" && property.type === "Kavling Bangunan") return true;
      if (activeTab === "ready" && property.type === "Kavling Siap Huni") return true;
      return false;
    })
    // Then filter by search term
    .filter(matchesSearch);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Properti</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Temukan berbagai pilihan kavling dan properti dengan lokasi strategis dan harga terjangkau
          </p>
        </div>

        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative flex mb-4">
            <Input
              type="search"
              placeholder="Cari properti berdasarkan nama, lokasi, atau fitur..."
              className="w-full pr-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-3 rounded-l-none bg-rekaland-orange hover:bg-orange-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        <div className="mb-8">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Kategori Properti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {productCategories.map((category) => (
                  <PropertyCategoryCard
                    key={category.id}
                    category={category}
                    isActive={activeTab === category.id}
                    onClick={() => navigate(category.path)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Properti Ditemukan</h3>
            <p className="text-gray-500 mb-4">
              Tidak ada properti yang sesuai dengan kriteria pencarian Anda.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                navigate("/produk");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
