
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
    </>
  );
};
