
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16 bg-rekaland-orange">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-white">
            <h2 className="text-3xl font-bold mb-2">Siap Untuk Berinvestasi?</h2>
            <p className="text-white text-opacity-90 text-lg">Konsultasikan kebutuhan properti Anda dengan tim ahli kami sekarang.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/kontak">
              <Button size="lg" className="bg-white text-rekaland-orange hover:bg-gray-100 min-w-40">
                Hubungi Kami
              </Button>
            </Link>
            <Link to="/produk">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-orange min-w-40">
                Lihat Katalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
