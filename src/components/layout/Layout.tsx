
// This file is deprecated, using MainLayout.tsx instead
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

// Redirecting component to ensure we're using the MainLayout consistently
const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.warn("Layout component is deprecated. Please use MainLayout instead.");
    // We don't need to redirect since we'll update all components to use MainLayout
  }, []);
  
  return children;
};

export default Layout;
