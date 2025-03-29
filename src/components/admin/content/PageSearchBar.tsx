
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageSearchBarProps {
  onSearch: (query: string) => void;
}

export const PageSearchBar = ({ onSearch }: PageSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Cari halaman..."
        className="pl-8 w-full sm:w-[200px] h-9"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
