
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type NavLink = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

interface MobileNavLinksProps {
  navLinks: NavLink[];
  isActivePath: (path: string) => boolean;
  dropdownOpen: string;
  toggleDropdown: (dropdown: string) => void;
}

export const MobileNavLinks = ({ 
  navLinks, 
  isActivePath, 
  dropdownOpen, 
  toggleDropdown 
}: MobileNavLinksProps) => {
  return (
    <nav className="flex flex-col space-y-1">
      {navLinks.map((link, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
        >
          {link.dropdown ? (
            <>
              <button
                onClick={() => toggleDropdown(link.name)}
                className={cn(
                  "flex justify-between items-center w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-all duration-200",
                  isActivePath(link.path)
                    ? "text-rekaland-orange bg-orange-50 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                )}
              >
                {link.name}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transform transition-transform duration-300",
                    dropdownOpen === link.name ? "rotate-180" : ""
                  )}
                />
              </button>

              {dropdownOpen === link.name && (
                <motion.div 
                  className="pl-4 space-y-1 mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {link.dropdown.map((item, j) => (
                    <Link
                      key={j}
                      to={item.path}
                      className={cn(
                        "block px-4 py-2 text-sm rounded-md transition-all duration-200",
                        isActivePath(item.path)
                          ? "text-rekaland-orange bg-orange-50 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <Link
              to={link.path}
              className={cn(
                "block px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                isActivePath(link.path)
                  ? "text-rekaland-orange bg-orange-50 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
              )}
            >
              {link.name}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  );
};
