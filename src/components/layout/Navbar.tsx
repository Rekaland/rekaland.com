
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "./AuthButtons";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { NavLinks } from "./NavLinks";
import { MobileNavLinks } from "./MobileNavLinks";
import { NavLogo } from "./NavLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Deteksi scroll untuk tampilan sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat rute berubah
  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen("");
    setIsSearchOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownOpen("");
  };

  const toggleDropdown = (dropdown: string) => {
    setDropdownOpen(dropdownOpen === dropdown ? "" : dropdown);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { 
      name: "Produk",
      path: "/produk",
      dropdown: [
        { name: "Kavling Kosongan", path: "/produk/kavling-kosongan" },
        { name: "Kavling Setengah Jadi", path: "/produk/kavling-setengah-jadi" },
        { name: "Kavling Siap Huni", path: "/produk/kavling-siap-huni" }
      ]
    },
    { name: "Informasi", path: "/informasi" }
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation */}
          <NavLinks 
            navLinks={navLinks} 
            isActivePath={isActivePath} 
            dropdownOpen={dropdownOpen} 
            toggleDropdown={toggleDropdown} 
            className="hidden md:flex"
          />

          {/* Right Section - Search & Auth */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden md:block w-56 lg:w-64">
              <SearchBar />
            </div>

            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:text-rekaland-orange hover:bg-orange-50"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:text-rekaland-orange hover:bg-orange-50"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white py-3 px-4 shadow-md">
          <SearchBar focusOnMount closeSheet={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 shadow-md">
          <div className="container mx-auto px-4 mobile-menu-container">
            <MobileNavLinks 
              navLinks={navLinks} 
              isActivePath={isActivePath} 
              dropdownOpen={dropdownOpen} 
              toggleDropdown={toggleDropdown} 
            />

            {/* Mobile Auth Buttons */}
            <div className="mt-4 px-4 py-2 border-t border-gray-200">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
