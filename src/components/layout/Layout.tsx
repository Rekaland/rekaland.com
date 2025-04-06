
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { BackToTopButton } from "./BackToTopButton";

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
      {/* Footer telah dihapus dari Layout untuk mencegah duplikasi */}
      <BackToTopButton />
    </div>
  );
};

export default Layout;
