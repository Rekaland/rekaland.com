
import { useState } from "react";
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
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md"
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
            <NavLinks location={location} />
            <SearchBar />
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              isAdmin={isAdmin} 
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-rekaland-black focus:outline-none"
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
          isAuthenticated={isAuthenticated} 
          isAdmin={isAdmin} 
          toggleMobileMenu={toggleMobileMenu} 
        />
      )}
    </header>
  );
};

export default Navbar;
