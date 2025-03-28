import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SearchBarProps {
  focusOnMount?: boolean;
  closeSheet?: () => void;
}

// Data kategori produk untuk pencarian cepat
const productCategories = [
  { id: "kavling-kosongan", name: "Kavling Kosongan" },
  { id: "kavling-setengah-jadi", name: "Kavling Setengah Jadi" },
  { id: "kavling-siap-huni", name: "Kavling Siap Huni" },
];

// Keywords yang sering dicari
const popularKeywords = [
  "Jakarta", "Lampung", "BSD", "Cisarua", "Premium", 
  "Strategis", "Dekat Stasiun", "View Pegunungan", "SHM", "Bebas Banjir"
];

export const SearchBar = ({ focusOnMount, closeSheet }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
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

  return (
    <div className="relative flex items-center gap-3">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Cari properti..."
          className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsCommandOpen(true)}
          onBlur={() => setTimeout(() => setIsCommandOpen(false), 200)}
        />
        <Button type="submit" className="hidden">Search</Button>
      </form>

      {isCommandOpen && searchTerm.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <Command className="border rounded-lg">
            <CommandList>
              <CommandGroup heading="Kategori Properti">
                {productCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => handleSearchItemClick(`/produk/${category.id}`)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              
              <CommandGroup heading="Kata Kunci Populer">
                {popularKeywords
                  .filter(keyword => 
                    keyword.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, 5)
                  .map((keyword, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        setSearchTerm(keyword);
                        handleSearchItemClick(`/produk?search=${encodeURIComponent(keyword)}`);
                      }}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {keyword}
                    </CommandItem>
                  ))
                }
              </CommandGroup>
              
              <CommandEmpty>Tidak ada hasil yang sesuai</CommandEmpty>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
