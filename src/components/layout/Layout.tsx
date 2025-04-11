
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { BackToTopButton } from "./BackToTopButton";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Efek untuk scroll ke atas saat navigasi
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
