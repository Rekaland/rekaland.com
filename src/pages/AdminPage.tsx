
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import EnhancedContentManagement from '@/components/admin/EnhancedContentManagement';
import EnhancedPropertyManagement from '@/components/admin/EnhancedPropertyManagement';
import { useToast } from '../hooks/use-toast';

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // This would typically check for authentication
    // For demo purposes, we'll just show a toast
    toast({
      title: "Selamat datang, Admin!",
      description: "Anda dapat mengelola konten dan properti website Rekaland disini.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Kelola konten dan pengaturan website Rekaland</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => window.open('/', '_blank')}>
              Lihat Website
            </Button>
            <Link to="/admin-dashboard">
              <Button>
                Dashboard Penuh
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Manajemen Konten</h2>
              <p className="text-sm text-gray-500">Kelola halaman, artikel, dan komponen website</p>
            </div>
            <EnhancedContentManagement />
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Manajemen Properti</h2>
              <p className="text-sm text-gray-500">Kelola listing properti dan kategorinya</p>
            </div>
            <EnhancedPropertyManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
