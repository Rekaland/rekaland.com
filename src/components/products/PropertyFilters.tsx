
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
import { Dispatch, SetStateAction } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PropertyFiltersProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  sortOption?: string;
  setSortOption?: (option: string) => void;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
  handleSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
  priceRange?: { min: number; max: number };
  setPriceRange?: Dispatch<SetStateAction<{ min: number; max: number }>>;
  landSizeRange?: { min: number; max: number };
  setLandSizeRange?: Dispatch<SetStateAction<{ min: number; max: number }>>;
  bedroomsFilter?: number | null;
  setBedroomsFilter?: Dispatch<SetStateAction<number | null>>;
  featuredOnly?: boolean;
  setFeaturedOnly?: Dispatch<SetStateAction<boolean>>;
}

export const PropertyFilters = ({
  searchTerm = "",
  setSearchTerm = () => {},
  sortOption = "default",
  setSortOption = () => {},
  viewMode = "grid",
  setViewMode = () => {},
  handleSearch = () => {},
  priceRange = { min: 0, max: 1000000 },
  setPriceRange = () => {},
  landSizeRange = { min: 0, max: 1000 },
  setLandSizeRange = () => {},
  bedroomsFilter = null,
  setBedroomsFilter = () => {},
  featuredOnly = false,
  setFeaturedOnly = () => {},
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
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Rentang Harga</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Rp {priceRange.min.toLocaleString()}</span>
              <span>Rp {priceRange.max.toLocaleString()}</span>
            </div>
            <Slider 
              defaultValue={[priceRange.min, priceRange.max]} 
              min={0} 
              max={1000000} 
              step={10000}
              className="my-4"
              onValueChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  setPriceRange({ min: value[0], max: value[1] });
                }
              }}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Luas Tanah (m²)</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{landSizeRange.min} m²</span>
              <span>{landSizeRange.max} m²</span>
            </div>
            <Slider 
              defaultValue={[landSizeRange.min, landSizeRange.max]} 
              min={0} 
              max={1000} 
              step={10}
              className="my-4"
              onValueChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  setLandSizeRange({ min: value[0], max: value[1] });
                }
              }}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Jumlah Kamar Tidur</h3>
          <div className="grid grid-cols-5 gap-2">
            {[null, 1, 2, 3, 4].map((num, index) => (
              <Button
                key={index}
                variant={bedroomsFilter === num ? "default" : "outline"}
                className={bedroomsFilter === num ? "bg-rekaland-orange" : ""}
                onClick={() => setBedroomsFilter(num)}
              >
                {num === null ? "Semua" : num}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="featured-only"
            checked={featuredOnly}
            onCheckedChange={setFeaturedOnly}
          />
          <Label htmlFor="featured-only">Hanya Tampilkan Properti Unggulan</Label>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm font-medium">Tampilan:</div>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
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
        </div>
        
        <div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full">
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
