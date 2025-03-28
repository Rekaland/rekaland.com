
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        {
          "bg-white shadow-md": scrolled,
          "bg-transparent": !scrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-rekaland-black">
              REKA<span className="text-rekaland-orange">LAND</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-rekaland-black hover:text-rekaland-orange transition-colors",
                {
                  "text-rekaland-orange font-medium": location.pathname === "/",
                }
              )}
            >
              Beranda
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center focus:outline-none">
                <span
                  className={cn(
                    "text-rekaland-black hover:text-rekaland-orange transition-colors",
                    {
                      "text-rekaland-orange font-medium":
                        location.pathname.includes("/produk"),
                    }
                  )}
                >
                  Produk
                </span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-white w-60">
                <DropdownMenuItem asChild>
                  <Link
                    to="/produk/kavling-kosongan"
                    className="w-full cursor-pointer hover:bg-rekaland-gray hover:text-rekaland-orange"
                  >
                    Kavling Kosongan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/produk/kavling-setengah-jadi"
                    className="w-full cursor-pointer hover:bg-rekaland-gray hover:text-rekaland-orange"
                  >
                    Kavling dan Bangunan Setengah Jadi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/produk/kavling-siap-huni"
                    className="w-full cursor-pointer hover:bg-rekaland-gray hover:text-rekaland-orange"
                  >
                    Kavling Siap Huni
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/tentang"
              className={cn(
                "text-rekaland-black hover:text-rekaland-orange transition-colors",
                {
                  "text-rekaland-orange font-medium":
                    location.pathname === "/tentang",
                }
              )}
            >
              Tentang
            </Link>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-none"
              />
            </div>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <span>Profil</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-rekaland-black hover:text-rekaland-orange">
                    Login
                  </Button>
                </Link>
                <Link to="/daftar">
                  <Button className="bg-rekaland-orange hover:bg-orange-600 text-white">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" className="border-rekaland-orange text-rekaland-orange hover:bg-orange-50">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-rekaland-black focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block py-2 text-rekaland-black hover:text-rekaland-orange"
              onClick={toggleMobileMenu}
            >
              Beranda
            </Link>
            <div className="py-2">
              <div className="flex justify-between items-center">
                <span className="text-rekaland-black">Produk</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="pl-4 mt-2 space-y-2">
                <Link
                  to="/produk/kavling-kosongan"
                  className="block py-1 text-rekaland-black hover:text-rekaland-orange"
                  onClick={toggleMobileMenu}
                >
                  Kavling Kosongan
                </Link>
                <Link
                  to="/produk/kavling-setengah-jadi"
                  className="block py-1 text-rekaland-black hover:text-rekaland-orange"
                  onClick={toggleMobileMenu}
                >
                  Kavling dan Bangunan Setengah Jadi
                </Link>
                <Link
                  to="/produk/kavling-siap-huni"
                  className="block py-1 text-rekaland-black hover:text-rekaland-orange"
                  onClick={toggleMobileMenu}
                >
                  Kavling Siap Huni
                </Link>
              </div>
            </div>
            <Link
              to="/tentang"
              className="block py-2 text-rekaland-black hover:text-rekaland-orange"
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
                <Link to="/profile" onClick={toggleMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User size={18} className="mr-2" />
                    Profil
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link to="/daftar" onClick={toggleMobileMenu}>
                    <Button className="w-full bg-rekaland-orange hover:bg-orange-600">
                      Daftar
                    </Button>
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link to="/admin" onClick={toggleMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-rekaland-orange text-rekaland-orange"
                  >
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
