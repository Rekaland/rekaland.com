
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map } from "lucide-react";

// Import our new components
import { ProductBreadcrumb } from "@/components/products/ProductBreadcrumb";
import { PropertyFilters } from "@/components/products/PropertyFilters";
import { ProductCategorySection } from "@/components/products/ProductCategorySection";
import { PropertyInfoSection } from "@/components/products/PropertyInfoSection";
import { PropertyGridView } from "@/components/products/PropertyGridView";
import { PropertyListView } from "@/components/products/PropertyListView";
import { PropertyPagination } from "@/components/products/PropertyPagination";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryProps, PropertyProps } from "@/types/product";

const EmptyLotPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
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

  // Sample data for kavling kosongan
  const emptyLots: PropertyProps[] = [
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

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

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
            Menampilkan {filteredEmptyLots.length} properti kavling kosongan
          </p>
        </div>

        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid">
            <PropertyGridView properties={filteredEmptyLots} />
          </TabsContent>

          <TabsContent value="list">
            <PropertyListView properties={filteredEmptyLots} />
          </TabsContent>
        </Tabs>
        
        <PropertyPagination 
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
};

export default EmptyLotPage;
