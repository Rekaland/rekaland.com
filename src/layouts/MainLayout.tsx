
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import AnimationProvider from "@/components/ui/animation-provider";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <AnimationProvider type="fade" delay={0.1}>
        <Navbar />
      </AnimationProvider>
      
      <motion.main 
        className="flex-grow"
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
