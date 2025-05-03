
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
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
    <div className="flex flex-col min-h-screen font-poppins overflow-x-hidden">
      {/* Navbar - diatur sebagai fixed untuk konsistensi */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      
      {/* Main content - mengurangi padding atas agar tidak ada jarak dengan navbar */}
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
      
      <Toaster />
      <BackToTopButton />
      
      {/* Removed any code that might be injecting the Lovable badge */}
    </div>
  );
}

export default MainLayout;
