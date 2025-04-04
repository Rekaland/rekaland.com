
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map, Search, SlidersHorizontal, X, MapPin, Loader2 } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";
import { PropertyGridView } from "@/components/products/PropertyGridView";
import { PropertyListView } from "@/components/products/PropertyListView";
import { PropertyFilters } from "@/components/products/PropertyFilters";
import { ProductCategorySection } from "@/components/products/ProductCategorySection";
import { useAuth } from "@/hooks/useAuth";
import { CategoryProps, PropertyProps } from "@/types/product";
import { useProperties } from "@/hooks/useProperties";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { formatCurrency } from "@/lib/utils";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("default");
  const [showMap, setShowMap] = useState(false);
  
  // Get properties from Supabase
  const { properties, loading, error, refetchProperties } = useProperties();
  
  // Setup real-time listening for updates
  const { isSubscribed } = useRealTimeSync('properties', refetchProperties);

  // Category definitions
  const productCategories: CategoryProps[] = [
    {
      id: "all",
      title: "Semua Kavling",
      icon: <Grid3X3 className="h-5 w-5" />,
      description: "Lihat semua properti yang tersedia",
      path: "/produk"
    },
    {
      id: "empty_lot",
      title: "Kavling Kosongan",
      icon: <Map className="h-5 w-5" />,
      description: "Tanah kavling siap bangun",
      path: "/produk?category=kavling-kosongan"
    },
    {
      id: "semi_finished",
      title: "Kavling Bangunan",
      icon: <Building className="h-5 w-5" />,
      description: "Kavling dengan struktur bangunan dasar",
      path: "/produk?category=kavling-setengah-jadi"
    },
    {
      id: "ready_to_occupy",
      title: "Kavling Siap Huni",
      icon: <Home className="h-5 w-5" />,
      description: "Properti siap untuk ditempati",
      path: "/produk?category=kavling-siap-huni"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse search parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    
    if (categoryParam) {
      // Set active category based on URL parameter
      if (categoryParam === 'kavling-kosongan') setActiveCategory("empty_lot");
      else if (categoryParam === 'kavling-setengah-jadi') setActiveCategory("semi_finished");
      else if (categoryParam === 'kavling-siap-huni') setActiveCategory("ready_to_occupy");
      else setActiveCategory("all");
    } else {
      setActiveCategory("all");
    }
    
    // Save search to history if logged in
    if (isAuthenticated && user && searchQuery && searchQuery.trim() !== '') {
      const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
      
      if (!searchHistory.some((item: any) => 
        item.type === 'search' && item.keyword === searchQuery)) {
        
        const historyItem = { 
          id: Date.now(), 
          type: 'search', 
          keyword: searchQuery, 
          timestamp: new Date().toISOString() 
        };
        
        searchHistory.unshift(historyItem);
        if (searchHistory.length > 20) searchHistory.pop();
        localStorage.setItem(`searchHistory_${user.email}`, JSON.stringify(searchHistory));
      }
    }
  }, [location.search, isAuthenticated, user]);

  // Format properties from the API for display
  const formatPropertiesForDisplay = (): PropertyProps[] => {
    if (!properties || properties.length === 0) return [];
    
    return properties.map(property => ({
      id: property.id,
      title: property.title,
      location: property.location,
      type: property.category === 'empty_lot' 
        ? 'Kavling Kosongan' 
        : property.category === 'semi_finished' 
          ? 'Kavling Bangunan' 
          : 'Kavling Siap Huni',
      price: `Rp ${formatCurrency(property.price)}`,
      priceNumeric: property.price,
      dpPrice: property.price * 0.3,
      area: property.land_size ? `${property.land_size} m²` : "120 m²",
      image: property.images?.length ? property.images[0] : `https://source.unsplash.com/random/300x200?property&sig=${property.id}`,
      category: property.category,
      features: [
        property.bedrooms ? `${property.bedrooms} kamar tidur` : "Akses mudah",
        property.bathrooms ? `${property.bathrooms} kamar mandi` : "Lokasi strategis",
        "Sertifikat SHM"
      ]
    }));
  };

  const handleCategoryClick = (categoryPath: string) => {
    navigate(categoryPath);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Save search to history if logged in
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
    }
    
    navigate(`/produk?search=${encodeURIComponent(searchTerm)}`);
  };

  // Filter properties based on activeCategory and searchTerm
  const filterProperties = () => {
    const formattedProperties = formatPropertiesForDisplay();
    
    return formattedProperties.filter(property => {
      // Filter by category
      if (activeCategory !== "all" && property.category !== activeCategory) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower) ||
          property.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
          property.price.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  // Sort filtered properties based on sortOption
  const sortProperties = (filteredProps: PropertyProps[]) => {
    switch(sortOption) {
      case "priceAsc":
        return [...filteredProps].sort((a, b) => 
          (a.priceNumeric || 0) - (b.priceNumeric || 0)
        );
      case "priceDesc":
        return [...filteredProps].sort((a, b) => 
          (b.priceNumeric || 0) - (a.priceNumeric || 0)
        );
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

  const filteredAndSortedProperties = sortProperties(filterProperties());

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Properti</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Temukan berbagai pilihan kavling dan properti dengan lokasi strategis dan harga terjangkau
          </p>
          {isSubscribed && (
            <div className="text-xs text-green-600 mt-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              Update real-time aktif
            </div>
          )}
        </div>
        
        {/* Search and Filter component */}
        <PropertyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleSearch={handleSearch}
        />

        {/* Category Selection */}
        <ProductCategorySection
          categories={productCategories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan {filteredAndSortedProperties.length} properti
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => setShowMap(!showMap)}
            className={showMap ? "bg-rekaland-orange text-white border-rekaland-orange hover:bg-orange-600" : ""}
          >
            <MapPin size={16} className="mr-2" />
            {showMap ? "Tampilan Daftar" : "Tampilan Peta"}
          </Button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Memuat data properti...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <Button 
              onClick={refetchProperties} 
              variant="outline" 
              className="mt-2"
            >
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Map View */}
        {!loading && showMap && (
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
        )}

        {/* No results */}
        {!loading && !error && filteredAndSortedProperties.length === 0 && (
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
                setActiveCategory("all");
                navigate("/produk");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}

        {/* Property listing */}
        {!loading && !error && !showMap && filteredAndSortedProperties.length > 0 && (
          viewMode === "grid" ? (
            <PropertyGridView properties={filteredAndSortedProperties} />
          ) : (
            <PropertyListView properties={filteredAndSortedProperties} />
          )
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
