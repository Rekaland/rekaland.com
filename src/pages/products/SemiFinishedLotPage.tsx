
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { MapPin, ArrowRight, Info, Check, Grid3X3, Home, Building, Map } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { PropertyGridView } from "@/components/products/PropertyGridView";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { PropertyProps } from "@/types/product";

const SemiFinishedLotPage = () => {
  const navigate = useNavigate();
  
  // Menggunakan hook useProperties untuk mengambil data properti kavling setengah jadi
  const { properties, loading, error, refetchProperties } = useProperties(undefined, "kavling-setengah-jadi");
  
  // Setup real-time sync
  const { isSubscribed } = useRealTimeSync('properties', refetchProperties);
  
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

  // Function to format data for display
  const formatPropertiesForDisplay = (): PropertyProps[] => {
    return properties.map(property => ({
      id: property.id,
      title: property.title,
      location: property.location,
      type: "Kavling Bangunan",
      price: `Rp ${Math.floor(property.price / 1000000)} juta`,
      priceNumeric: property.price,
      dpPrice: property.price * 0.3,
      area: property.land_size ? `${property.land_size} m²` : "120 m²",
      image: property.images?.[0] || `https://source.unsplash.com/random/300x200?property&sig=${property.id}`,
      features: [
        property.bedrooms ? `${property.bedrooms} kamar tidur` : "Struktur kokoh",
        property.bathrooms ? `${property.bathrooms} kamar mandi` : "Desain modern",
        "Lingkungan asri"
      ],
      category: "kavling-setengah-jadi"
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
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-rekaland-orange">Beranda</Link>
              <span>/</span>
              <Link to="/produk" className="hover:text-rekaland-orange">Produk</Link>
              <span>/</span>
              <span className="text-rekaland-orange">Kavling Bangunan</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Kavling Bangunan</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Rumah dan bangunan dengan struktur dasar yang dapat Anda selesaikan dan kembangkan sesuai dengan keinginan Anda.
            </p>
            {isSubscribed && (
              <div className="text-xs text-green-600 mt-2 flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Update real-time aktif
              </div>
            )}
          </div>
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
                    isActive={category.id === "semifinished"}
                    onClick={() => navigate(category.path)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-rekaland-orange mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Tentang Kavling Bangunan</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Kavling bangunan adalah properti yang telah dibangun dengan struktur dasar, seperti pondasi, rangka, 
                dan atap. Anda dapat menyelesaikan pembangunan sesuai dengan preferensi dan anggaran Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan {formattedProperties.length} properti kavling bangunan
          </p>
        </div>

        {formattedProperties.length > 0 ? (
          <PropertyGridView properties={formattedProperties} />
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Properti Ditemukan</h3>
            <p className="text-gray-500 mb-4">
              Tidak ada properti kavling bangunan yang tersedia saat ini.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate("/produk")}
            >
              Lihat Semua Properti
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SemiFinishedLotPage;
