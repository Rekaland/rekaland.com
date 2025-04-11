
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { BackToTopButton } from "./BackToTopButton";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
