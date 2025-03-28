
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthButtons = ({ isAuthenticated, isAdmin }: AuthButtonsProps) => {
  return (
    <>
      {isAuthenticated ? (
        <Link to="/profile">
          <Button variant="ghost" className="flex items-center gap-2">
            <User size={18} />
            <span>Profil</span>
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <Button 
              variant="ghost" 
              className="text-rekaland-black hover:bg-gray-100 hover:text-rekaland-orange active:bg-gray-200"
            >
              Masuk
            </Button>
          </Link>
          <Link to="/daftar">
            <Button className="bg-rekaland-orange hover:bg-orange-600 text-white">
              Daftar
            </Button>
          </Link>
        </>
      )}
      {isAdmin && (
        <Link to="/admin">
          <Button variant="outline" className="border-rekaland-orange text-rekaland-orange hover:bg-orange-50">
            Admin
          </Button>
        </Link>
      )}
    </>
  );
};
