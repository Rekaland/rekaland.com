
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PropertyCategoriesSection = () => {
  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pilihan Kavling <span className="text-rekaland-orange">Untuk Anda</span></h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Kami menyediakan berbagai jenis kavling yang dapat disesuaikan dengan kebutuhan dan budget Anda</p>
        </div>
        
        <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-3 gap-4 pb-4 md:pb-0 md:gap-6 scrollbar-none">
          {/* Kavling Kosongan */}
          <Card className="min-w-[80%] md:min-w-0 flex-shrink-0 md:flex-shrink-1 overflow-hidden hover:shadow-lg transition-all duration-300 border-0 dark:bg-gray-800">
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" 
                alt="Kavling Kosongan" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-2 left-3 text-lg md:text-xl font-bold text-white">Kavling Kosongan</h3>
            </div>
            <CardContent className="p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">Tanah kavling siap bangun dengan sertifikat legal yang dapat Anda kembangkan sesuai keinginan.</p>
              <Link to="/produk/kavling-kosongan" className="flex items-center text-xs md:text-sm font-medium text-rekaland-orange">
                Lihat Kavling <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Kavling Setengah Jadi */}
          <Card className="min-w-[80%] md:min-w-0 flex-shrink-0 md:flex-shrink-1 overflow-hidden hover:shadow-lg transition-all duration-300 border-0 dark:bg-gray-800">
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" 
                alt="Kavling Setengah Jadi" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-2 left-3 text-lg md:text-xl font-bold text-white">Kavling Setengah Jadi</h3>
            </div>
            <CardContent className="p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">Kavling dengan struktur bangunan dasar yang dapat Anda selesaikan sesuai desain pilihan.</p>
              <Link to="/produk/kavling-setengah-jadi" className="flex items-center text-xs md:text-sm font-medium text-rekaland-orange">
                Lihat Kavling <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Kavling Siap Huni */}
          <Card className="min-w-[80%] md:min-w-0 flex-shrink-0 md:flex-shrink-1 overflow-hidden hover:shadow-lg transition-all duration-300 border-0 dark:bg-gray-800">
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" 
                alt="Kavling Siap Huni" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-2 left-3 text-lg md:text-xl font-bold text-white">Kavling Siap Huni</h3>
            </div>
            <CardContent className="p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">Rumah dan bangunan komersial yang sudah jadi dan siap untuk dihuni atau digunakan.</p>
              <Link to="/produk/kavling-siap-huni" className="flex items-center text-xs md:text-sm font-medium text-rekaland-orange">
                Lihat Kavling <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
