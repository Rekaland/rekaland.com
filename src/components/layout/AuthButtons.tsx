
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./UserProfileMenu";

export const AuthButtons = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserProfileMenu />
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-rekaland-orange hover:bg-orange-50"
              size="sm"
            >
              Masuk
            </Button>
          </Link>
          <Link to="/daftar">
            <Button 
              className="bg-rekaland-orange hover:bg-orange-600 text-white border-transparent"
              size="sm"
            >
              Daftar
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
