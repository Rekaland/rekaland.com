
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, User, Settings, ChevronDown, LayoutDashboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const UserProfileMenu = () => {
  const { user, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun",
      duration: 1000,
      className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none",
    });
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const goToSettings = () => {
    navigate("/settings");
    setIsOpen(false);
  };

  const goToAdmin = () => {
    navigate("/admin");
    setIsOpen(false);
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get username or display name
  const getDisplayName = () => {
    if (!user?.name) return "Pengguna";
    return user.name.split(" ")[0]; // Just first name for compact display
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-orange-50 hover:text-rekaland-orange pr-3 pl-2"
        >
          <Avatar className="h-8 w-8 border border-orange-200">
            <AvatarFallback className="bg-orange-100 text-rekaland-orange font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline-block">
            {getDisplayName()}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-in fade-in-80 zoom-in-95">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user?.name || "Pengguna"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={goToProfile} className="cursor-pointer hover:bg-orange-50">
          <User className="mr-2 h-4 w-4" />
          <span>Profil Saya</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToSettings} className="cursor-pointer hover:bg-orange-50">
          <Settings className="mr-2 h-4 w-4" />
          <span>Pengaturan</span>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem onClick={goToAdmin} className="cursor-pointer hover:bg-orange-50">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard Admin</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-500 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
