
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { SearchResults } from "./SearchResults";

interface SearchBarProps {
  focusOnMount?: boolean;
  closeSheet?: () => void;
}

export const SearchBar = ({ focusOnMount, closeSheet }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }

    // Handle click outside to close search results
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsCommandOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focusOnMount]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchTerm && searchTerm.trim() !== "") {
      navigate(`/produk?search=${encodeURIComponent(searchTerm)}`);
      if (closeSheet) {
        closeSheet();
      }
      setIsCommandOpen(false);
    }
  };

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    if (closeSheet) {
      closeSheet();
    }
    setIsCommandOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative flex items-center gap-3" ref={searchContainerRef}>
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Cari properti..."
          className="pl-10 pr-8 py-2 rounded-full bg-gray-100 focus:bg-white border-none w-full transition-all duration-300 focus:shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsCommandOpen(true)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Button type="submit" className="hidden">Search</Button>
      </form>

      {isCommandOpen && searchTerm.length > 0 && (
        <SearchResults 
          searchTerm={searchTerm}
          onItemClick={handleSearchItemClick}
          onTermSelect={setSearchTerm}
        />
      )}
    </div>
  );
};
