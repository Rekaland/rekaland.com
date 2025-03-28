
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="search"
        placeholder="Cari..."
        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-none"
      />
    </div>
  );
};
