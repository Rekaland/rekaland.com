
import { Link } from "react-router-dom";
import { Check, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhyChooseUsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-rekaland-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Mengapa Memilih <span className="text-rekaland-orange">Rekaland?</span></h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Kami berkomitmen menyediakan properti berkualitas dengan proses yang transparan</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 md:h-7 md:w-7 text-rekaland-orange" />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-1">Legalitas Terjamin</h3>
              <p className="text-gray-300 text-xs md:text-sm">Semua properti memiliki dokumen legal yang lengkap.</p>
            </div>
            
            <div className="text-center p-3 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 md:h-7 md:w-7 text-rekaland-orange" />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-1">Lokasi Strategis</h3>
              <p className="text-gray-300 text-xs md:text-sm">Properti di lokasi dengan prospek nilai tinggi.</p>
            </div>
            
            <div className="text-center p-3 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 md:h-7 md:w-7 text-rekaland-orange" />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-1">Konsultasi Gratis</h3>
              <p className="text-gray-300 text-xs md:text-sm">Tim kami siap memberikan konsultasi properti.</p>
            </div>
            
            <div className="text-center p-3 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="h-6 w-6 md:h-7 md:w-7 text-rekaland-orange" />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-1">Proses Mudah</h3>
              <p className="text-gray-300 text-xs md:text-sm">Layanan pengurusan dokumen cepat dan efisien.</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/tentang">
              <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-black">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
