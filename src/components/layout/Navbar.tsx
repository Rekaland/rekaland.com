
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";
import { BackToTopButton } from "./BackToTopButton";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-background transition-all duration-300 ${
          isScrolled ? "shadow-md" : "border-b border-border"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/00cd7c13-64b6-4964-ab06-13691f814c9b.png" 
                alt="RekaLand Logo" 
                className="h-12 sm:h-14 mr-2" 
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.alt = "RekaLand Logo (fallback)";
                }}
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base text-rekaland-orange leading-tight">REKALAND</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Invest In Land, Invest In Tomorrow</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLinks location={location} />
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center ml-auto mr-4">
              <SearchBar />
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu 
            location={location} 
            toggleMobileMenu={toggleMobileMenu} 
          />
        )}
      </header>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  );
};

export default Navbar;
