
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Grid3X3 } from "lucide-react";

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  handleSearch,
}: PropertyFiltersProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8 border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSearch} className="relative flex mb-4">
        <Input
          type="search"
          placeholder="Cari properti kavling kosongan..."
          className="w-full pr-12 rounded-full border-gray-300 focus:border-rekaland-orange focus:ring focus:ring-orange-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          type="submit" 
          className="absolute right-0 top-0 h-full px-3 rounded-l-none rounded-r-full bg-rekaland-orange hover:bg-orange-600"
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid" className="px-3 py-1">
                <Grid3X3 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3 py-1">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline">List</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">Urutkan:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Terbaru</SelectItem>
              <SelectItem value="priceAsc">Harga: Rendah ke Tinggi</SelectItem>
              <SelectItem value="priceDesc">Harga: Tinggi ke Rendah</SelectItem>
              <SelectItem value="areaAsc">Luas: Kecil ke Besar</SelectItem>
              <SelectItem value="areaDesc">Luas: Besar ke Kecil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
