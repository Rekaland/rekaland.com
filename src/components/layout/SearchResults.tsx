
import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { productCategories, popularKeywords } from "./searchData";
import { Home, Building, Map, Search, History } from "lucide-react";

interface SearchResultsProps {
  searchTerm: string;
  onItemClick: (path: string) => void;
  onTermSelect: (term: string) => void;
}

// Helper untuk mendapatkan ikon berdasarkan kategori
const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case "kavling-kosongan":
      return <Map className="h-4 w-4 mr-2 text-gray-500" />;
    case "kavling-setengah-jadi":
      return <Building className="h-4 w-4 mr-2 text-gray-500" />;
    case "kavling-siap-huni":
      return <Home className="h-4 w-4 mr-2 text-gray-500" />;
    default:
      return <Map className="h-4 w-4 mr-2 text-gray-500" />;
  }
};

export const SearchResults = ({ searchTerm, onItemClick, onTermSelect }: SearchResultsProps) => {
  return (
    <div 
      className="absolute top-full mt-1 left-0 right-0 bg-white rounded-md shadow-lg overflow-hidden z-50 animate-fade-in"
      style={{ 
        transformOrigin: "top center",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <Command className="border rounded-lg">
        <CommandList>
          <CommandGroup heading="Kategori Properti">
            {productCategories.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => onItemClick(`/produk/${category.id}`)}
                className="cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center py-2"
              >
                {getCategoryIcon(category.id)}
                <span className="font-medium">{category.name}</span>
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
                    onTermSelect(keyword);
                    onItemClick(`/produk?search=${encodeURIComponent(keyword)}`);
                  }}
                  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center py-2"
                >
                  <History className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{keyword}</span>
                </CommandItem>
              ))
            }
          </CommandGroup>
          
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Search className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">Tidak ada hasil yang sesuai</p>
              <p className="text-gray-400 text-xs mt-1">Coba gunakan kata kunci yang berbeda</p>
            </div>
          </CommandEmpty>
        </CommandList>
      </Command>
    </div>
  );
};
