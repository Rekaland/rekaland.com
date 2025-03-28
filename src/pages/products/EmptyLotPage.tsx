
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { MapPin, ArrowRight, Info, Check, Grid3X3, Home, Building, Map } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";

const EmptyLotPage = () => {
  const navigate = useNavigate();
  
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
        
        <div className="mb-8">
          <Card className="border-0 shadow-md overflow-hidden">
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
        
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-rekaland-orange mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Tentang Kavling Kosongan</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Kavling kosongan adalah tanah yang telah dipersiapkan dengan fasilitas lingkungan seperti jalan, saluran drainase, dan utilitas publik. 
                Anda memiliki kebebasan penuh untuk membangun sesuai dengan kebutuhan dan desain impian Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {emptyLots.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default EmptyLotPage;
