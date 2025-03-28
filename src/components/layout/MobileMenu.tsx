
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";

interface MobileMenuProps {
  location: {
    pathname: string;
  };
  toggleMobileMenu: () => void;
}

export const MobileMenu = ({ 
  location, 
  toggleMobileMenu 
}: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="md:hidden bg-background border-t border-border shadow-lg animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="px-4 py-6 space-y-4">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-3 mb-2 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            {theme === "dark" ? (
              <Moon size={18} className="text-foreground" />
            ) : (
              <Sun size={18} className="text-rekaland-orange" />
            )}
            <span className="text-foreground">
              Mode {theme === "dark" ? "Gelap" : "Terang"}
            </span>
          </div>
          <Switch 
            checked={theme === "dark"} 
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-rekaland-orange"
          />
        </div>
        
        <Link
          to="/"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname === "/" 
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium" 
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Beranda
        </Link>
        
        <Link
          to="/produk"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname.includes("/produk")
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Produk
        </Link>
        
        <Link
          to="/informasi"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname.includes("/informasi")
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Informasi
        </Link>
        
        <Link
          to="/tentang"
          className={cn(
            "block py-3 px-4 rounded-md transition-colors",
            location.pathname === "/tentang"
              ? "bg-orange-100 dark:bg-orange-900/20 text-rekaland-orange font-medium"
              : "hover:bg-muted text-foreground hover:text-rekaland-orange"
          )}
          onClick={toggleMobileMenu}
        >
          Tentang
        </Link>

        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            placeholder="Cari..."
            className="pl-10 w-full bg-muted/50 border-border"
          />
        </div>

        <div className="pt-4 mt-4 border-t border-border space-y-3">
          {isAuthenticated ? (
            <div className="flex justify-center py-2">
              <UserProfileMenu />
            </div>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="block w-full">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center hover:text-rekaland-orange hover:bg-orange-100 dark:hover:bg-orange-900/20"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/daftar" onClick={toggleMobileMenu} className="block w-full">
                <Button 
                  className="w-full bg-rekaland-orange hover:bg-orange-600 text-white border-transparent"
                >
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
