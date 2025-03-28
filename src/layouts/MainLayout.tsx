
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout>
      <div className="w-full">
        {children}
      </div>
    </Layout>
  );
};

export default MainLayout;
