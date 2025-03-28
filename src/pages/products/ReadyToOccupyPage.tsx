
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { MapPin, ArrowRight, Info, Check, Grid3X3, Home, Building, Map } from "lucide-react";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { PropertyCard } from "@/components/products/PropertyCard";

const ReadyToOccupyPage = () => {
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

  // Sample data for kavling siap huni
  const readyToOccupyLots = [
    {
      id: 1,
      title: "Villa Asri Lampung",
      location: "Cisarua, Lampung Selatan",
      price: "Rp1.2 milyar",
      area: "250 m²",
      type: "Kavling Siap Huni",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Fully furnished", "View pegunungan", "Keamanan 24 jam"]
    },
    {
      id: 2,
      title: "Rumah Mewah Jakarta Selatan",
      location: "Kebayoran Baru, Jakarta Selatan",
      price: "Rp3.5 milyar",
      area: "350 m²",
      type: "Kavling Siap Huni",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["5 kamar tidur", "Smart home", "Kolam renang"]
    },
    {
      id: 3,
      title: "Apartemen Mewah Surabaya",
      location: "Surabaya, Jawa Timur",
      price: "Rp900 juta",
      area: "90 m²",
      type: "Kavling Siap Huni",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["2 kamar tidur", "Fasilitas lengkap", "View kota"]
    },
    {
      id: 4,
      title: "Cluster Modern BSD",
      location: "BSD City, Tangerang Selatan",
      price: "Rp1.5 milyar",
      area: "180 m²",
      type: "Kavling Siap Huni",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["One gate system", "Taman bermain", "Clubhouse"]
    },
    {
      id: 5,
      title: "Rumah Premium Lampung",
      location: "Cisarua, Lampung Selatan",
      price: "Rp1.8 milyar",
      area: "300 m²",
      type: "Kavling Siap Huni",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["4 kamar tidur", "Udara sejuk", "View pegunungan"]
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
              <span className="text-rekaland-orange">Kavling Siap Huni</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Kavling Siap Huni</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Properti yang sudah selesai dibangun dan siap untuk dihuni, dengan desain modern dan fasilitas lengkap.
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
                    isActive={category.id === "ready"}
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
              <h3 className="font-semibold mb-1">Tentang Kavling Siap Huni</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Kavling siap huni adalah properti yang telah selesai dibangun dan siap untuk ditempati. 
                Anda dapat langsung menempati properti tanpa perlu renovasi atau pembangunan lebih lanjut.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {readyToOccupyLots.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReadyToOccupyPage;
