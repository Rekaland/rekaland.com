
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
          duration: 1000,
          className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
        });
        setShowWelcome(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, toast]);

  return null; // This component doesn't render anything, it just shows a toast
};

export default WelcomeToast;
