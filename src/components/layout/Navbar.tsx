
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "./AuthButtons";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";

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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b486d576-e0ba-4dde-92b2-dcac9a60c681.png" 
              alt="Rekaland Logo" 
              className="h-8 md:h-10" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              link.dropdown ? (
                <div className="relative" key={i}>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                      isActivePath(link.path)
                        ? "text-rekaland-orange"
                        : "text-gray-700 hover:text-rekaland-orange"
                    )}
                  >
                    {link.name}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {dropdownOpen === link.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 fade-in">
                      {link.dropdown.map((item, j) => (
                        <Link
                          key={j}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rekaland-orange"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    isActivePath(link.path)
                      ? "text-rekaland-orange"
                      : "text-gray-700 hover:text-rekaland-orange"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

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
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, i) => (
                <div key={i}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex justify-between items-center w-full px-4 py-2 text-left text-sm font-medium rounded-md",
                          isActivePath(link.path)
                            ? "text-rekaland-orange bg-orange-50"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transform transition-transform",
                            dropdownOpen === link.name ? "rotate-180" : ""
                          )}
                        />
                      </button>

                      {dropdownOpen === link.name && (
                        <div className="pl-4 space-y-1 mt-1">
                          {link.dropdown.map((item, j) => (
                            <Link
                              key={j}
                              to={item.path}
                              className={cn(
                                "block px-4 py-2 text-sm rounded-md",
                                isActivePath(item.path)
                                  ? "text-rekaland-orange bg-orange-50"
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        "block px-4 py-2 text-sm font-medium rounded-md",
                        isActivePath(link.path)
                          ? "text-rekaland-orange bg-orange-50"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

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
