
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const CtaSection = () => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Halo Rekaland, saya tertarik dengan properti Anda dan ingin berkonsultasi untuk mendapatkan informasi lebih lanjut."
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  const handleCatalogClick = () => {
    window.location.href = "/produk";
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-rekaland-orange to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-white">
            <h2 className="text-3xl font-bold mb-2">Siap Untuk Berinvestasi?</h2>
            <p className="text-white text-opacity-90 text-lg">Konsultasikan kebutuhan properti Anda dengan tim ahli kami sekarang.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-rekaland-orange hover:bg-gray-100 min-w-40 font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={openWhatsApp}
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Hubungi Kami
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-orange min-w-40 font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={handleCatalogClick}
            >
              Lihat Katalog <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
