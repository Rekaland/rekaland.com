
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";
import { LogIn, UserPlus, Building } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthButtons = () => {
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated || false;
  const isAdmin = auth.isAdmin || false;

  return (
    <>
      {isAuthenticated ? (
        <UserProfileMenu />
      ) : (
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/login?redirect_to=/produk">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-rekaland-orange hover:bg-orange-50 flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
                size="sm"
              >
                <LogIn size={16} />
                <span>Masuk</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="bg-rekaland-orange hover:bg-orange-600 text-white border-transparent flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
                  size="sm"
                >
                  <UserPlus size={16} />
                  <span>Daftar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <Link to="/register">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Daftar Sebagai Pengguna</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/daftar-pengelola-properti">
                  <DropdownMenuItem className="cursor-pointer">
                    <Building className="mr-2 h-4 w-4" />
                    <span>Daftar Sebagai Pengelola Properti</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      )}
    </>
  );
};
