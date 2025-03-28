
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PropertyCategoriesSection = () => {
  const propertyCategories = [
    {
      id: 1,
      title: "Kavling Kosongan",
      description: "Tanah kavling siap bangun dengan sertifikat legal yang dapat Anda kembangkan sesuai keinginan.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      link: "/produk/kavling-kosongan"
    },
    {
      id: 2,
      title: "Kavling Setengah Jadi",
      description: "Kavling dengan struktur bangunan dasar yang dapat Anda selesaikan sesuai desain pilihan.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      link: "/produk/kavling-setengah-jadi"
    },
    {
      id: 3,
      title: "Kavling Siap Huni",
      description: "Rumah dan bangunan komersial yang sudah jadi dan siap untuk dihuni atau digunakan.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      link: "/produk/kavling-siap-huni"
    }
  ];

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900" id="property-categories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pilihan Kavling <span className="text-rekaland-orange">Untuk Anda</span></h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Kami menyediakan berbagai jenis kavling yang dapat disesuaikan dengan kebutuhan dan budget Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propertyCategories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 dark:bg-gray-800 group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-xs text-white/80 mb-4 line-clamp-2">{category.description}</p>
                  <Link to={category.link} className="w-full">
                    <Button 
                      className="w-full bg-white/20 backdrop-blur-sm hover:bg-white text-white hover:text-rekaland-black transition-all border border-white/40"
                    >
                      Lihat Kavling
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
