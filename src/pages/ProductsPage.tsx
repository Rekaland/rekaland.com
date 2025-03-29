import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map, Search, SlidersHorizontal, X, Check, ArrowDownUp, MapPin } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

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

  const locations = Array.from(new Set(properties.map(p => p.location)));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
      
      if (isAuthenticated && user && search.trim() !== '') {
        const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
        
        if (!searchHistory.some((item: any) => 
          item.type === 'search' && item.keyword === search)) {
          
          const historyItem = { 
            id: Date.now(), 
            type: 'search', 
            keyword: search, 
            timestamp: new Date().toISOString() 
          };
          
          searchHistory.unshift(historyItem);
          
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
    window.scrollTo(0, 0);
    
    const path = location.pathname;
    if (path === "/produk") setActiveTab("all");
    else if (path.includes("kavling-kosongan")) setActiveTab("empty");
    else if (path.includes("kavling-setengah-jadi")) setActiveTab("semifinished");
    else if (path.includes("kavling-siap-huni")) setActiveTab("ready");
    
    localStorage.setItem('allProperties', JSON.stringify(properties));
  }, [location.pathname]);

  const toggleLocationFilter = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };

  const filterProperties = () => {
    return properties
      .filter(property => {
        if (activeTab === "all") return true;
        if (activeTab === "empty" && property.type === "Kavling Kosongan") return true;
        if (activeTab === "semifinished" && property.type === "Kavling Bangunan") return true;
        if (activeTab === "ready" && property.type === "Kavling Siap Huni") return true;
        return false;
      })
      .filter(property => {
        if (!searchTerm.trim()) return true;
        
        const searchLower = searchTerm.toLowerCase();
        
        if (property.title.toLowerCase().includes(searchLower)) return true;
        if (property.location.toLowerCase().includes(searchLower)) return true;
        if (property.type.toLowerCase().includes(searchLower)) return true;
        
        if (property.features.some((feature: string) => 
          feature.toLowerCase().includes(searchLower))) return true;
        
        if (property.price.toLowerCase().includes(searchLower)) return true;
        
        return false;
      })
      .filter(property => {
        if (selectedLocations.length === 0) return true;
        return selectedLocations.includes(property.location);
      })
      .filter(property => {
        if (priceRange === "all") return true;
        
        const numericPrice = parseInt(property.price.replace(/\D/g, ''));
        
        if (priceRange === "under300" && numericPrice < 300) return true;
        if (priceRange === "300to500" && numericPrice >= 300 && numericPrice <= 500) return true;
        if (priceRange === "500to1000" && numericPrice > 500 && numericPrice <= 1000) return true;
        if (priceRange === "above1000" && numericPrice > 1000) return true;
        
        return false;
      });
  };

  const sortProperties = (filteredProps: any[]) => {
    switch(sortOption) {
      case "priceAsc":
        return [...filteredProps].sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/\D/g, ''));
          const bPrice = parseInt(b.price.replace(/\D/g, ''));
          return aPrice - bPrice;
        });
      case "priceDesc":
        return [...filteredProps].sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/\D/g, ''));
          const bPrice = parseInt(b.price.replace(/\D/g, ''));
          return bPrice - aPrice;
        });
      case "areaAsc":
        return [...filteredProps].sort((a, b) => {
          const aArea = parseInt(a.area);
          const bArea = parseInt(b.area);
          return aArea - bArea;
        });
      case "areaDesc":
        return [...filteredProps].sort((a, b) => {
          const aArea = parseInt(a.area);
          const bArea = parseInt(b.area);
          return bArea - aArea;
        });
      default:
        return filteredProps;
    }
  };

  const filteredProperties = sortProperties(filterProperties());

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isAuthenticated && user && searchTerm.trim() !== '') {
      const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
      
      const historyItem = { 
        id: Date.now(), 
        type: 'search', 
        keyword: searchTerm, 
        timestamp: new Date().toISOString() 
      };
      
      searchHistory.unshift(historyItem);
      
      if (searchHistory.length > 20) searchHistory.pop();
      
      localStorage.setItem(`searchHistory_${user.email}`, JSON.stringify(searchHistory));
    } else if (!isAuthenticated && searchTerm.trim() !== '') {
      localStorage.setItem('lastSearchKeyword', searchTerm);
    }
    
    navigate(`/produk?search=${encodeURIComponent(searchTerm)}`);
  };

  const resetFilters = () => {
    setSelectedLocations([]);
    setPriceRange("all");
    setSortOption("default");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Properti</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Temukan berbagai pilihan kavling dan properti dengan lokasi strategis dan harga terjangkau
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative flex mb-4">
            <Input
              type="search"
              placeholder="Cari properti berdasarkan nama, lokasi, atau fitur..."
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
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Filter Properti</h3>
                      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 max-h-[60vh] overflow-y-auto">
                    <Accordion type="single" collapsible defaultValue="price">
                      <AccordionItem value="price">
                        <AccordionTrigger>Rentang Harga</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="price-all" 
                                name="price-range" 
                                checked={priceRange === "all"}
                                onChange={() => setPriceRange("all")}
                                className="mr-2"
                              />
                              <label htmlFor="price-all">Semua Harga</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="price-under300" 
                                name="price-range"
                                checked={priceRange === "under300"}
                                onChange={() => setPriceRange("under300")}
                                className="mr-2"
                              />
                              <label htmlFor="price-under300">Di bawah Rp 300 juta</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="price-300to500" 
                                name="price-range"
                                checked={priceRange === "300to500"}
                                onChange={() => setPriceRange("300to500")}
                                className="mr-2"
                              />
                              <label htmlFor="price-300to500">Rp 300 juta - Rp 500 juta</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="price-500to1000" 
                                name="price-range"
                                checked={priceRange === "500to1000"}
                                onChange={() => setPriceRange("500to1000")}
                                className="mr-2"
                              />
                              <label htmlFor="price-500to1000">Rp 500 juta - Rp 1 milyar</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="price-above1000" 
                                name="price-range"
                                checked={priceRange === "above1000"}
                                onChange={() => setPriceRange("above1000")}
                                className="mr-2"
                              />
                              <label htmlFor="price-above1000">Di atas Rp 1 milyar</label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="location">
                        <AccordionTrigger>Lokasi</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {locations.map((location, index) => (
                              <div key={index} className="flex items-center">
                                <Checkbox
                                  id={`location-${index}`}
                                  checked={selectedLocations.includes(location)}
                                  onCheckedChange={() => toggleLocationFilter(location)}
                                />
                                <label htmlFor={`location-${index}`} className="ml-2">
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-3 border-t border-gray-200 flex justify-end">
                    <Button onClick={() => setIsFilterOpen(false)} className="bg-rekaland-orange hover:bg-orange-600">
                      Terapkan Filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="outline" 
                onClick={() => setShowMap(!showMap)}
                className={showMap ? "bg-rekaland-orange text-white border-rekaland-orange hover:bg-orange-600" : ""}
              >
                <MapPin size={16} className="mr-2" />
                Tampilan Peta
              </Button>
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
                    isActive={activeTab === category.id}
                    onClick={() => navigate(category.path)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {(selectedLocations.length > 0 || priceRange !== "all") && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Filter aktif:</span>
            
            {priceRange !== "all" && (
              <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs rounded-full px-3 py-1">
                {priceRange === "under300" && "Di bawah Rp 300 juta"}
                {priceRange === "300to500" && "Rp 300 juta - Rp 500 juta"}
                {priceRange === "500to1000" && "Rp 500 juta - Rp 1 milyar"}
                {priceRange === "above1000" && "Di atas Rp 1 milyar"}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => setPriceRange("all")} />
              </span>
            )}
            
            {selectedLocations.map(location => (
              <span key={location} className="inline-flex items-center bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs rounded-full px-3 py-1">
                {location}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => toggleLocationFilter(location)} />
              </span>
            ))}
            
            <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto text-xs h-7">
              Reset Semua
            </Button>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan {filteredProperties.length} properti
          </p>
        </div>

        {showMap ? (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center min-h-[400px] flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Tampilan Peta</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Fitur tampilan peta akan segera hadir.
              </p>
              <Button onClick={() => setShowMap(false)}>
                Kembali ke Tampilan Daftar
              </Button>
            </div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full p-3 w-16 h-16 flex items-center justify-center">
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
                resetFilters();
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
