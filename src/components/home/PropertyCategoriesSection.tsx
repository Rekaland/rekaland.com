
import { useNavigate } from "react-router-dom";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { Grid3X3, Home, Building, Map } from "lucide-react";
import { useState } from "react";

const PropertyCategoriesSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  
  const propertyCategories = [
    {
      id: "all",
      title: "Semua Kavling",
      description: "Lihat semua properti yang tersedia",
      icon: <Grid3X3 className="h-5 w-5" />,
      path: "/produk"
    },
    {
      id: "empty",
      title: "Kavling Kosongan",
      description: "Tanah kavling siap bangun",
      icon: <Map className="h-5 w-5" />,
      path: "/produk/kavling-kosongan"
    },
    {
      id: "semifinished",
      title: "Kavling Bangunan",
      description: "Kavling dengan struktur bangunan dasar",
      icon: <Building className="h-5 w-5" />,
      path: "/produk/kavling-setengah-jadi"
    },
    {
      id: "ready",
      title: "Kavling Siap Huni",
      description: "Properti siap untuk ditempati",
      icon: <Home className="h-5 w-5" />,
      path: "/produk/kavling-siap-huni"
    }
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id);
    navigate(category.path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900" id="property-categories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pilihan Kavling <span className="text-rekaland-orange">Untuk Anda</span></h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Kami menyediakan berbagai jenis kavling yang dapat disesuaikan dengan kebutuhan dan budget Anda</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {propertyCategories.map((category) => (
            <PropertyCategoryCard 
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
