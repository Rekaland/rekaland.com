
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export const AuthButtons = () => {
  const { isAuthenticated, isAdmin } = useAuth();

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
                animation="3d"
              >
                <LogIn size={16} />
                <span>Masuk</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/daftar">
              <Button 
                className="bg-rekaland-orange hover:bg-orange-600 text-white border-transparent flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
                size="sm"
                animation="3d"
              >
                <UserPlus size={16} />
                <span>Daftar</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
};
