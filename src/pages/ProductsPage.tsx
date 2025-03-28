
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/layouts/MainLayout";
import { ArrowRight, Filter, Search, Grid3X3, Home, Building, Map } from "lucide-react";

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
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

  const handleCategoryClick = (path) => {
    navigate(path);
    // Ensure we scroll to top when changing categories
    window.scrollTo(0, 0);
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

        <div className="mb-8">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Kategori Properti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {productCategories.map((category) => (
                  <div 
                    key={category.id}
                    onClick={() => handleCategoryClick(category.path)}
                    className={`
                      cursor-pointer p-4 rounded-lg transition-all 
                      ${activeTab === category.id 
                        ? 'bg-rekaland-orange text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`
                        p-2 rounded-full mr-3 
                        ${activeTab === category.id 
                          ? 'bg-white/20' 
                          : 'bg-white dark:bg-gray-700'
                        }
                      `}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <p className="text-sm opacity-80">{category.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for product cards */}
          {Array(6).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
              <div className="relative h-60">
                <img 
                  src={`https://source.unsplash.com/random/300x200?property&sig=${index}`} 
                  alt="Property" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
                  {index % 3 === 0 ? "Kavling Kosongan" : index % 3 === 1 ? "Kavling Bangunan" : "Siap Huni"}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Properti Premium {index + 1}</h3>
                <p className="text-gray-500 mb-2 flex items-center">
                  <span className="flex items-center text-sm">
                    {index % 2 === 0 ? "Jakarta Selatan" : "Tangerang Selatan"}
                  </span>
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-rekaland-orange">Rp {(300 + index * 50).toLocaleString()}jt</span>
                  <Button size="sm" className="bg-rekaland-orange hover:bg-orange-600">
                    Detail <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
