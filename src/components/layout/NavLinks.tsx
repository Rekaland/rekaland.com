
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavLink = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

interface NavLinksProps {
  navLinks: NavLink[];
  isActivePath: (path: string) => boolean;
  dropdownOpen: string;
  toggleDropdown: (dropdown: string) => void;
  className?: string;
}

export const NavLinks = ({ 
  navLinks, 
  isActivePath, 
  dropdownOpen, 
  toggleDropdown,
  className 
}: NavLinksProps) => {
  return (
    <nav className={cn("flex items-center space-x-1", className)}>
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
  );
};
