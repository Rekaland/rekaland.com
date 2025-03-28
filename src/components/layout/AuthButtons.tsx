
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
              className="text-foreground hover:text-rekaland-orange hover:bg-orange-100 dark:hover:bg-orange-900/20"
            >
              Masuk
            </Button>
          </Link>
          <Link to="/daftar">
            <Button className="bg-rekaland-orange hover:bg-orange-600 text-white border-transparent">
              Daftar
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
