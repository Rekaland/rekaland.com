
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import AnimationProvider from "@/components/ui/animation-provider";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Efek untuk scroll ke atas saat navigasi
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <AnimationProvider type="fade" delay={0.1}>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      </AnimationProvider>
      
      <motion.main 
        className="flex-grow pt-16 md:pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <AnimationProvider type="fade" delay={0.2}>
        <Footer />
      </AnimationProvider>
      
      <Toaster />
      <BackToTopButton />
    </div>
  );
};

export default MainLayout;
