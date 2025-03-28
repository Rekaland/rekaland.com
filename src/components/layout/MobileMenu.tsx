
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";

interface MobileMenuProps {
  location: {
    pathname: string;
  };
  toggleMobileMenu: () => void;
}

export const MobileMenu = ({ 
  location, 
  toggleMobileMenu 
}: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();
  
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Halo Rekaland, saya tertarik dengan properti Anda dan ingin berkonsultasi untuk mendapatkan informasi lebih lanjut."
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  const openInstagram = () => {
    window.open('https://instagram.com/rekaland.idn', '_blank');
  };
  
  return (
    <div className="md:hidden bg-background border-t border-border shadow-lg animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="px-4 py-6 space-y-4">
        <Link
          to="/"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname === "/" 
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium" 
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Beranda
        </Link>
        
        <Link
          to="/produk"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname.includes("/produk")
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Produk
        </Link>
        
        <Link
          to="/informasi"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname.includes("/informasi")
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Informasi
        </Link>
        
        <Link
          to="/tentang"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname === "/tentang"
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Tentang
        </Link>

        {/* Contact Info */}
        <div className="mt-6 space-y-3 bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium text-sm text-foreground/80">Kontak Kami:</h4>
          
          <button onClick={openWhatsApp} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-md hover:bg-muted transition-colors">
            <Phone size={16} className="text-rekaland-orange" />
            <span className="text-sm">+62 821-7796-8062</span>
          </button>
          
          <button onClick={openInstagram} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-md hover:bg-muted transition-colors">
            <Instagram size={16} className="text-rekaland-orange" />
            <span className="text-sm">@rekaland.idn</span>
          </button>
          
          <div className="flex items-start space-x-3 py-2 px-3">
            <MapPin size={16} className="text-rekaland-orange mt-1 flex-shrink-0" />
            <span className="text-sm">Cisarua, Lampung Selatan, Lampung</span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-border space-y-3">
          {isAuthenticated ? (
            <div className="flex justify-center py-2">
              <UserProfileMenu />
            </div>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="block w-full">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center hover:text-rekaland-orange hover:bg-orange-100 dark:hover:bg-orange-900/20"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/daftar" onClick={toggleMobileMenu} className="block w-full">
                <Button 
                  className="w-full bg-rekaland-orange hover:bg-orange-600 text-white border-transparent"
                >
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
