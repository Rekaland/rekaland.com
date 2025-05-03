
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map } from "lucide-react";

// Import our components
import { ProductBreadcrumb } from "@/components/products/ProductBreadcrumb";
import { PropertyFilters } from "@/components/products/PropertyFilters";
import { ProductCategorySection } from "@/components/products/ProductCategorySection";
import { PropertyInfoSection } from "@/components/products/PropertyInfoSection";
import { PropertyGridView } from "@/components/products/PropertyGridView";
import { PropertyListView } from "@/components/products/PropertyListView";
import { PropertyPagination } from "@/components/products/PropertyPagination";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryProps, PropertyProps } from "@/types/product";
import { useProperties, mapDbCategoryToUrlCategory, mapDbCategoryToDisplayName } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { formatCurrency } from "@/lib/utils";

const EmptyLotPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Menggunakan hook useProperties untuk mengambil data properti kavling kosongan
  const { properties, loading, error, refetchProperties } = useProperties(undefined, "kavling-kosongan");
  
  // Setup real-time sync
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

  // Search and sort functionality
  const filteredEmptyLots = properties
    .filter(property => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      
      if (property.title.toLowerCase().includes(searchLower)) return true;
      if (property.location.toLowerCase().includes(searchLower)) return true;
      
      return false;
    })
    .sort((a, b) => {
      if (sortOption === "priceAsc") {
        const aPrice = a.price || 0;
        const bPrice = b.price || 0;
        return aPrice - bPrice;
      } else if (sortOption === "priceDesc") {
        const aPrice = a.price || 0;
        const bPrice = b.price || 0;
        return bPrice - aPrice;
      } else if (sortOption === "areaAsc") {
        const aArea = a.land_size || 0;
        const bArea = b.land_size || 0;
        return aArea - bArea;
      } else if (sortOption === "areaDesc") {
        const aArea = a.land_size || 0;
        const bArea = b.land_size || 0;
        return bArea - aArea;
      }
      return 0;
    });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const breadcrumbPaths = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "Kavling Kosongan", path: "/produk/kavling-kosongan", active: true }
  ];

  const infoSectionData = {
    title: "Tentang Kavling Kosongan",
    description: "Kavling kosongan adalah tanah yang telah dipersiapkan dengan fasilitas lingkungan seperti jalan, saluran drainase, dan utilitas publik. Anda memiliki kebebasan penuh untuk membangun sesuai dengan kebutuhan dan desain impian Anda.",
    features: [
      "Sertifikat Hak Milik (SHM)", 
      "Bebas banjir", 
      "Akses mudah ke jalan utama", 
      "ROI tinggi"
    ]
  };

  // Function to format data for PropertyGridView
  const formatPropertiesForDisplay = (): PropertyProps[] => {
    return properties.map(property => ({
      id: property.id,
      title: property.title,
      location: property.location,
      type: "Kavling Kosongan",
      price: `Rp ${formatCurrency(property.price || 0)}`,
      priceNumeric: property.price || 0,
      dpPrice: (property.price || 0) * 0.3,
      area: property.land_size ? `${property.land_size} m²` : "120 m²",
      image: property.images?.[0] || `https://source.unsplash.com/random/300x200?property&sig=${property.id}`,
      features: [
        "Akses mudah", 
        "Lokasi strategis", 
        "Sertifikat SHM"
      ],
      category: "kavling-kosongan"
    }));
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="mb-8">
            <Skeleton className="h-32 w-full mb-4" />
          </div>
          
          <div className="mb-8">
            <Skeleton className="h-32 w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error Loading Properties</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              onClick={refetchProperties}
              className="px-4 py-2 bg-rekaland-orange text-white rounded hover:bg-orange-600"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formattedProperties = formatPropertiesForDisplay();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <ProductBreadcrumb paths={breadcrumbPaths} />
            <h1 className="text-3xl font-bold mb-2">Kavling Kosongan</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Investasi tanah kavling dengan lokasi strategis dan sertifikat legal yang dapat Anda kembangkan sesuai kebutuhan dan keinginan.
            </p>
          </div>
        </div>
        
        <PropertyFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleSearch={handleSearch}
        />
        
        <ProductCategorySection 
          categories={productCategories}
          activeCategory="empty"
          onCategoryClick={(path) => navigate(path)}
        />
        
        <PropertyInfoSection 
          title={infoSectionData.title}
          description={infoSectionData.description}
          features={infoSectionData.features}
        />

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan {formattedProperties.length} properti kavling kosongan
          </p>
        </div>

        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid">
            <PropertyGridView 
              properties={formattedProperties} 
              emptyMessage="Tidak ada properti kavling kosongan yang tersedia saat ini."
            />
          </TabsContent>

          <TabsContent value="list">
            <PropertyListView properties={formattedProperties} />
          </TabsContent>
        </Tabs>
        
        {formattedProperties.length > 0 && (
          <PropertyPagination 
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(formattedProperties.length / 6))}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default EmptyLotPage;
