
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, LogOut } from 'lucide-react';
import { NavLogo } from '@/components/layout/NavLogo';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <NavLogo />
            <span className="ml-2 font-bold text-xl text-gray-800 dark:text-white">Admin Panel</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Home size={16} /> 
                <span className="hidden sm:inline">Website</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-500 hover:text-red-600">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
