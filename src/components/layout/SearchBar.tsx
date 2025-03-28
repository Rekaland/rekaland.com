
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/useTheme";

interface SearchBarProps {
  focusOnMount?: boolean;
  closeSheet?: () => void;
}

export const SearchBar = ({ focusOnMount, closeSheet }: SearchBarProps) => {
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const searchValue = inputRef.current?.value;
    if (searchValue && searchValue.trim() !== "") {
      navigate(`/produk?search=${encodeURIComponent(searchValue)}`);
      if (closeSheet) {
        closeSheet();
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Cari properti..."
          className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-none w-full"
        />
        <Button type="submit" className="hidden">Search</Button>
      </form>
      
      <div className="hidden md:block">
        <Toggle 
          pressed={theme === "dark"} 
          onPressedChange={toggleTheme}
          variant="outline" 
          size="sm"
          aria-label="Toggle theme"
          className="rounded-full"
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </Toggle>
      </div>
    </div>
  );
};
