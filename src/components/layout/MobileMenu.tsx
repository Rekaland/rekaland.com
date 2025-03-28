
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
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
  
  return (
    <div className="md:hidden bg-white shadow-lg">
      <div className="px-4 py-3 space-y-3">
        <Link
          to="/"
          className={cn(
            "block py-3 px-2 rounded-md hover:bg-gray-100",
            {
              "bg-gray-100 text-rekaland-orange": location.pathname === "/",
            }
          )}
          onClick={toggleMobileMenu}
        >
          Beranda
        </Link>
        
        <Link
          to="/produk"
          className={cn(
            "block py-3 px-2 rounded-md hover:bg-gray-100",
            {
              "bg-gray-100 text-rekaland-orange": location.pathname.includes("/produk"),
            }
          )}
          onClick={toggleMobileMenu}
        >
          Produk
        </Link>
        
        <Link
          to="/informasi"
          className={cn(
            "block py-3 px-2 rounded-md hover:bg-gray-100",
            {
              "bg-gray-100 text-rekaland-orange": location.pathname.includes("/informasi"),
            }
          )}
          onClick={toggleMobileMenu}
        >
          Informasi
        </Link>
        
        <Link
          to="/tentang"
          className={cn(
            "block py-3 px-2 rounded-md hover:bg-gray-100",
            {
              "bg-gray-100 text-rekaland-orange": location.pathname === "/tentang",
            }
          )}
          onClick={toggleMobileMenu}
        >
          Tentang
        </Link>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="Cari..."
            className="pl-10 w-full bg-gray-100"
          />
        </div>

        <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
          {isAuthenticated ? (
            <div className="flex justify-center py-2">
              <UserProfileMenu />
            </div>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu}>
                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 hover:text-rekaland-orange">
                  Masuk
                </Button>
              </Link>
              <Link to="/daftar" onClick={toggleMobileMenu}>
                <Button className="w-full bg-rekaland-orange hover:bg-orange-600">
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
