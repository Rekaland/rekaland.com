
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-rekaland-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                REKA<span className="text-rekaland-orange">LAND</span>
              </h2>
            </Link>
            <p className="text-gray-400 mt-4">
              Platform penyedia dan pemasaran tanah kavling terpercaya dengan
              berbagai pilihan lokasi strategis untuk investasi properti Anda.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-rekaland-orange p-2 rounded-full transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-rekaland-orange p-2 rounded-full transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Link Cepat
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-rekaland-orange"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-rekaland-orange transition-colors duration-300 flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/produk/kavling-kosongan"
                  className="text-gray-400 hover:text-rekaland-orange transition-colors duration-300 flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Kavling Kosongan
                </Link>
              </li>
              <li>
                <Link
                  to="/produk/kavling-setengah-jadi"
                  className="text-gray-400 hover:text-rekaland-orange transition-colors duration-300 flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Kavling Setengah Jadi
                </Link>
              </li>
              <li>
                <Link
                  to="/produk/kavling-siap-huni"
                  className="text-gray-400 hover:text-rekaland-orange transition-colors duration-300 flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Kavling Siap Huni
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang"
                  className="text-gray-400 hover:text-rekaland-orange transition-colors duration-300 flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Kontak Kami
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-rekaland-orange"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-rekaland-orange mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Jl. Properti Masa Depan No. 123, Jakarta Selatan, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-rekaland-orange mr-3 flex-shrink-0" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-rekaland-orange mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@rekaland.id</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-rekaland-orange"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              Dapatkan informasi terbaru dan penawaran eksklusif dari kami.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Email Anda"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-rekaland-orange hover:bg-orange-600 text-white w-full">
                Langganan
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Rekaland. Semua Hak Dilindungi.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privasi" className="text-gray-400 hover:text-rekaland-orange text-sm">
                Kebijakan Privasi
              </Link>
              <Link to="/syarat" className="text-gray-400 hover:text-rekaland-orange text-sm">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
