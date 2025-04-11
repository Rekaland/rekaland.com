import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, List, Home, Building, Map, MapPin, Loader2, ArrowRight, Heart } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { properties, loading, error, refetchProperties } = useProperties();
  const { isSubscribed } = useRealTimeSync('properties', refetchProperties);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      if (categoryParam === 'kavling-kosongan') setActiveCategory("empty_lot");
      else if (categoryParam === 'kavling-setengah-jadi') setActiveCategory("semi_finished");
      else if (categoryParam === 'kavling-siap-huni') setActiveCategory("ready_to_occupy");
      else setActiveCategory("all");
    } else {
      setActiveCategory("all");
    }
  }, [location.search]);

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

  const filterProperties = () => {
    const formattedProperties = formatPropertiesForDisplay();
    
    if (activeCategory === "all") {
      return formattedProperties;
    }
    
    return formattedProperties.filter(property => property.category === activeCategory);
  };

  const filteredProperties = filterProperties();

  const getFeaturedProperties = () => {
    const featured = properties.filter(p => p.featured);
    if (featured.length === 0) return filterProperties().slice(0, 3);
    
    return formatPropertiesForDisplay().filter(p => 
      featured.some(f => f.id === p.id)
    );
  };

  return (
    <MainLayout>
      <div className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Properti Unggulan</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Temukan properti premium kami dengan lokasi strategis dan harga terbaik
            </p>
            {isSubscribed && (
              <div className="text-xs text-green-600 mt-2 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Update real-time aktif
              </div>
            )}
          </div>
          
          <ProductCategorySection
            categories={productCategories}
            activeCategory={activeCategory}
            onCategoryClick={(path) => navigate(path)}
          />

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Memuat data properti...</p>
              </div>
            </div>
          )}

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

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {(filteredProperties.length > 0 ? filteredProperties : getFeaturedProperties()).map((property) => (
                <FeaturedPropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-6 mb-8">
            <Button 
              onClick={() => navigate('/produk')} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-lg rounded-md"
            >
              Lihat Semua Properti
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const FeaturedPropertyCard = ({ property }: { property: PropertyProps }) => {
  const navigate = useNavigate();
  
  const dpPrice = Math.round(property.priceNumeric * 0.3);
  const formattedDpPrice = `Rp ${formatCurrency(dpPrice)}`;
  
  const getCategoryLabel = (category: string): { text: string, className: string } => {
    switch(category) {
      case 'empty_lot':
        return { 
          text: 'Kavling Kosongan', 
          className: 'bg-blue-500 text-white' 
        };
      case 'semi_finished':
        return { 
          text: 'Kavling Bangunan', 
          className: 'bg-yellow-500 text-white' 
        };
      case 'ready_to_occupy':
        return { 
          text: 'Kavling Siap Huni', 
          className: 'bg-green-500 text-white' 
        };
      default:
        return { 
          text: 'Properti', 
          className: 'bg-gray-500 text-white' 
        };
    }
  };
  
  const categoryInfo = getCategoryLabel(property.category);
  
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-64 object-cover" 
        />
        <span className={`absolute top-3 left-3 ${categoryInfo.className} px-3 py-1 text-sm rounded-full`}>
          {categoryInfo.text}
        </span>
        <button 
          className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Save property"
        >
          <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2">{property.title}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-orange-500 font-bold text-xl">
              {property.price}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cash
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              {formattedDpPrice}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              DP Kredit
            </p>
          </div>
        </div>
        
        <div className="flex items-center mb-4 text-sm border-b pb-4">
          <span className="mr-2">{property.area}</span>
          <div className="ml-auto flex gap-1">
            <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs">Cash</span>
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs">Kredit</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Fitur:</h4>
          <ul className="space-y-1">
            {property.features?.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-xs">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          onClick={() => navigate(`/produk/${property.id}`)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Lihat Detail
        </Button>
      </div>
    </div>
  );
};

export default ProductsPage;
