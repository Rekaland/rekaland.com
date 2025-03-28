
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3X3, Home, Building, Map } from "lucide-react";

const PropertyCategoriesSection = () => {
  const navigate = useNavigate();
  
  const propertyCategories = [
    {
      id: "all",
      title: "Semua Kavling",
      description: "Lihat semua properti yang tersedia",
      icon: <Grid3X3 className="h-6 w-6" />,
      path: "/produk"
    },
    {
      id: "empty",
      title: "Kavling Kosongan",
      description: "Tanah kavling siap bangun",
      icon: <Map className="h-6 w-6" />,
      path: "/produk/kavling-kosongan"
    },
    {
      id: "semifinished",
      title: "Kavling Bangunan",
      description: "Kavling dengan struktur bangunan dasar",
      icon: <Building className="h-6 w-6" />,
      path: "/produk/kavling-setengah-jadi"
    },
    {
      id: "ready",
      title: "Kavling Siap Huni",
      description: "Properti siap untuk ditempati",
      icon: <Home className="h-6 w-6" />,
      path: "/produk/kavling-siap-huni"
    }
  ];

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900" id="property-categories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pilihan Kavling <span className="text-rekaland-orange">Untuk Anda</span></h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Kami menyediakan berbagai jenis kavling yang dapat disesuaikan dengan kebutuhan dan budget Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyCategories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 dark:bg-gray-800 group cursor-pointer"
              onClick={() => handleClick(category.path)}
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className={`
                  mb-4 p-4 rounded-full 
                  ${category.id === "all" 
                    ? "bg-rekaland-orange text-white" 
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
                `}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{category.description}</p>
                <Button 
                  className="mt-auto w-full bg-gray-200 hover:bg-rekaland-orange hover:text-white text-gray-800 transition-all"
                >
                  Lihat Kavling
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
