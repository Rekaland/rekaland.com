
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "./AuthButtons";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { NavLinks } from "./NavLinks";
import { MobileNavLinks } from "./MobileNavLinks";
import { NavLogo } from "./NavLogo";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const { toast } = useToast();
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
    setIsSearchExpanded(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownOpen("");
  };

  const toggleDropdown = (dropdown: string) => {
    setDropdownOpen(dropdownOpen === dropdown ? "" : dropdown);
  };

  const toggleSearch = () => {
    if (window.innerWidth < 768) {
      setIsSearchOpen(!isSearchOpen);
    } else {
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    toast({
      title: language === "id" ? "Language Changed" : "Bahasa Diubah",
      description: language === "id" 
        ? "Language set to English" 
        : "Bahasa diatur ke Indonesia",
      duration: 2000,
      className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none",
    });
  };

  const navLinks = [
    { name: language === "id" ? "Beranda" : "Home", path: "/" },
    { name: language === "id" ? "Tentang" : "About", path: "/tentang" },
    { name: language === "id" ? "Produk" : "Products", path: "/produk" },
    { name: language === "id" ? "Informasi" : "Information", path: "/informasi" }
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-lg" : "bg-white/80"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavLinks 
              navLinks={navLinks} 
              isActivePath={isActivePath} 
              dropdownOpen={dropdownOpen} 
              toggleDropdown={toggleDropdown} 
              className="hidden md:flex"
            />
          </div>

          {/* Right Section - Search, Language & Auth */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div 
              className={cn(
                "hidden md:flex items-center transition-all duration-300 overflow-hidden", 
                isSearchExpanded ? "w-64" : "w-10"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-rekaland-orange hover:bg-orange-50"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {isSearchExpanded && (
                <div className="flex-1 ml-1">
                  <SearchBar closeSheet={() => setIsSearchExpanded(false)} focusOnMount />
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-gray-700 hover:text-rekaland-orange hover:bg-orange-50 relative"
              aria-label={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-0.5 right-0 text-[10px] font-bold bg-orange-100 text-rekaland-orange rounded-full w-4 h-4 flex items-center justify-center">
                {language.toUpperCase()}
              </span>
            </Button>

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
        <div className="md:hidden bg-white py-2 shadow-lg">
          <div className="container mx-auto px-4">
            <MobileNavLinks 
              navLinks={navLinks} 
              isActivePath={isActivePath} 
              dropdownOpen={dropdownOpen} 
              toggleDropdown={toggleDropdown} 
            />
            
            {/* Language Toggle on Mobile */}
            <div className="mt-4 px-4 py-2 border-t border-gray-200">
              <button 
                onClick={toggleLanguage}
                className="flex items-center w-full py-2 px-3 rounded-md hover:bg-gray-50"
              >
                <Globe className="mr-3 h-5 w-5 text-rekaland-orange" />
                <span>
                  {language === "id" 
                    ? "Ganti ke Bahasa Inggris" 
                    : "Switch to Indonesian"}
                </span>
              </button>
            </div>

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
