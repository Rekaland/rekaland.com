
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const SearchBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="search"
          placeholder="Cari..."
          className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-none"
        />
      </div>
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
  );
};
