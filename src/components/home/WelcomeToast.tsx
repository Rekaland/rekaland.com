
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const WelcomeToast = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome toast if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        toast({
          title: "Selamat Datang",
          description: `Halo, ${user.name || "Pengguna"}! Senang melihat Anda kembali.`,
          duration: 2000,
        });
        setShowWelcome(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, toast]);

  return null; // This component doesn't render anything, it just shows a toast
};

export default WelcomeToast;
