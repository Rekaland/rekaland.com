
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Layout from '@/components/layout/Layout';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import { PropertyInfoSection } from '@/components/products/PropertyInfoSection';
import { usePropertyDetail } from '@/hooks/useProperties';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { property, loading, error } = usePropertyDetail(id);
  const navigate = useNavigate();
  
  // Menggunakan real-time sync untuk mendapatkan pembaruan otomatis
  const { isSubscribed } = useRealTimeSync('properties', () => {
    console.log('Real-time update received for properties table');
  });

  useEffect(() => {
    console.log('Product detail page loaded with ID:', id);
    console.log('Real-time sync status:', isSubscribed ? 'Connected' : 'Not connected');
  }, [id, isSubscribed]);

  // Tampilkan loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <ProductBreadcrumb 
            paths={[
              { name: 'Beranda', path: '/', active: false },
              { name: 'Produk', path: '/produk', active: false },
              { name: 'Memuat...', path: '', active: true }
            ]} 
          />
          
          <div className="mt-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-24 w-full mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Tampilkan error jika gagal memuat data
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <ProductBreadcrumb 
            paths={[
              { name: 'Beranda', path: '/', active: false },
              { name: 'Produk', path: '/produk', active: false },
              { name: 'Error', path: '', active: true }
            ]} 
          />
          
          <div className="mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Gagal memuat detail properti. Silakan coba lagi nanti.
                {error && <p className="mt-2 text-sm text-red-400">Detail: {error}</p>}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Layout>
    );
  }

  // Fallback ke data mock jika tidak ada properti yang ditemukan
  if (!property) {
    // Mock data untuk fallback
    const mockPropertyInfo = {
      title: `Hunian ${id || 'Premium'} Tipe Eksklusif`,
      description: "Hunian premium dengan desain modern dan fasilitas lengkap. Lokasi strategis dengan akses mudah ke pusat kota.",
      features: [
        "Luas tanah 150m²",
        "Bangunan 2 lantai",
        "3 kamar tidur",
        "2 kamar mandi",
        "Carport 2 mobil",
        "Taman belakang",
        "Keamanan 24 jam",
        "Dekat dengan fasilitas umum"
      ]
    };

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <ProductBreadcrumb 
            paths={[
              { name: 'Beranda', path: '/', active: false },
              { name: 'Produk', path: '/produk', active: false },
              { name: `Detail Produk ${id}`, path: '', active: true }
            ]} 
          />
          
          <div className="mt-8">
            <PropertyInfoSection 
              title={mockPropertyInfo.title}
              description={mockPropertyInfo.description}
              features={mockPropertyInfo.features}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // Tampilkan data yang diambil dari Supabase
  const propertyFeatures = [
    property.land_size ? `Luas tanah ${property.land_size}m²` : null,
    property.building_size ? `Luas bangunan ${property.building_size}m²` : null,
    property.bedrooms ? `${property.bedrooms} kamar tidur` : null,
    property.bathrooms ? `${property.bathrooms} kamar mandi` : null,
    "Lokasi strategis",
    property.category === 'ready_to_occupy' ? "Siap huni" : null,
    property.category === 'semi_finished' ? "Tahap penyelesaian" : null,
    property.address ? `Alamat: ${property.address}` : null
  ].filter(Boolean) as string[];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb 
          paths={[
            { name: 'Beranda', path: '/', active: false },
            { name: 'Produk', path: '/produk', active: false },
            { name: property.title || `Detail Produk ${id}`, path: '', active: true }
          ]} 
        />
        
        <div className="mt-8">
          <PropertyInfoSection 
            title={property.title}
            description={property.description || ""}
            features={propertyFeatures}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
