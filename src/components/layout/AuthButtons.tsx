
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";
import { LogIn, UserPlus } from "lucide-react";

export const AuthButtons = () => {
  const { isAuthenticated } = useAuth();

  console.log("AuthButtons - isAuthenticated:", isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <UserProfileMenu />
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login?redirect_to=/produk">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-rekaland-orange hover:bg-orange-50 flex items-center gap-1.5"
              size="sm"
            >
              <LogIn size={16} />
              <span>Masuk</span>
            </Button>
          </Link>
          <Link to="/daftar">
            <Button 
              className="bg-rekaland-orange hover:bg-orange-600 text-white border-transparent flex items-center gap-1.5"
              size="sm"
            >
              <UserPlus size={16} />
              <span>Daftar</span>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
