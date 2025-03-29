
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  );
};
