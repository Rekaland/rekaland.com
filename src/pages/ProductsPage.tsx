
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { Grid3X3, Home, Building, Map } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

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

  // Filter properties based on active tab
  const filteredProperties = activeTab === "all" 
    ? properties 
    : properties.filter(property => {
        if (activeTab === "empty" && property.type === "Kavling Kosongan") return true;
        if (activeTab === "semifinished" && property.type === "Kavling Bangunan") return true;
        if (activeTab === "ready" && property.type === "Kavling Siap Huni") return true;
        return false;
      });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Properti</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Temukan berbagai pilihan kavling dan properti dengan lokasi strategis dan harga terjangkau
          </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
