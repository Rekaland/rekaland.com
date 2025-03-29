
import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { productCategories, popularKeywords } from "./searchData";

interface SearchResultsProps {
  searchTerm: string;
  onItemClick: (path: string) => void;
  onTermSelect: (term: string) => void;
}

export const SearchResults = ({ searchTerm, onItemClick, onTermSelect }: SearchResultsProps) => {
  return (
    <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <Command className="border rounded-lg">
        <CommandList>
          <CommandGroup heading="Kategori Properti">
            {productCategories.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => onItemClick(`/produk/${category.id}`)}
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
                    onTermSelect(keyword);
                    onItemClick(`/produk?search=${encodeURIComponent(keyword)}`);
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
  );
};
