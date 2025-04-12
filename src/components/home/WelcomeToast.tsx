
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WelcomeToast = () => {
  const { toast } = useToast();
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  
  useEffect(() => {
    // Periksa apakah welcome toast sudah pernah ditampilkan dalam sesi ini
    const hasShown = sessionStorage.getItem("welcomeToastShown");
    
    if (!hasShown && !hasShownWelcome) {
      // Set timeout untuk menghindari race condition dengan toast lainnya
      const timer = setTimeout(() => {
        toast({
          title: "Selamat Datang di RekaLand",
          description: "Temukan kavling impian untuk investasi properti Anda",
          duration: 5000,
          className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none",
        });
        
        // Tandai bahwa toast sudah ditampilkan
        sessionStorage.setItem("welcomeToastShown", "true");
        setHasShownWelcome(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [toast, hasShownWelcome]);
  
  return null;
};

export default WelcomeToast;
