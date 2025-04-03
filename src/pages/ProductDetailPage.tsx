
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Home, MapPin, Phone, MessageSquare } from "lucide-react";
import Layout from '@/components/layout/Layout';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import { PropertyInfoSection } from '@/components/products/PropertyInfoSection';
import { usePropertyDetail } from '@/hooks/useProperties';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';
import { ProductContentDisplay } from '@/components/products/ProductContentDisplay';
import { useProductContent } from '@/hooks/useProductContent';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { property, loading: loadingProperty, error: propertyError } = usePropertyDetail(id);
  
  // Gunakan hook untuk mengambil konten produk dengan real-time sync
  const { 
    content, 
    loading: loadingContent, 
    error: contentError, 
    isRealTimeConnected 
  } = useProductContent(property?.id);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    console.log('Product detail page loaded with ID:', id);
    console.log('Real-time sync status:', isRealTimeConnected ? 'Connected' : 'Not connected');
  }, [id, isRealTimeConnected]);

  // Tampilkan loading state
  if (loadingProperty) {
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

  // Tampilkan error jika gagal memuat data properti
  if (propertyError) {
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
                {propertyError && <p className="mt-2 text-sm text-red-400">Detail: {propertyError}</p>}
              </AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <Link to="/produk">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Kembali ke Daftar Produk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Fallback ke data mock jika tidak ada properti yang ditemukan
  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <ProductBreadcrumb 
            paths={[
              { name: 'Beranda', path: '/', active: false },
              { name: 'Produk', path: '/produk', active: false },
              { name: 'Properti Tidak Ditemukan', path: '', active: true }
            ]} 
          />
          
          <div className="mt-8">
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Properti Tidak Ditemukan</AlertTitle>
              <AlertDescription>
                Maaf, properti yang Anda cari tidak ditemukan atau mungkin telah dihapus.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <Link to="/produk">
                <Button variant="default" className="flex items-center gap-2">
                  <Home size={16} />
                  Lihat Semua Properti
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Format display untuk properti
  const formatCategory = (category: string) => {
    switch (category) {
      case 'empty_lot': return 'Kavling Kosongan';
      case 'semi_finished': return 'Kavling Bangunan';
      case 'ready_to_occupy': return 'Siap Huni';
      default: return category;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Tampilkan data properti dan kontennya
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb 
          paths={[
            { name: 'Beranda', path: '/', active: false },
            { name: 'Produk', path: '/produk', active: false },
            { name: formatCategory(property.category), path: `/produk/${property.category}`, active: false },
            { name: property.title, path: '', active: true }
          ]} 
        />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="h-[300px] md:h-[400px] bg-gray-200 relative">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <div className="text-center text-gray-400">
                      <Home size={48} className="mx-auto mb-2" />
                      <p>Tidak ada gambar</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
                  <span className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {formatPrice(property.price)}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin size={18} className="mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  {property.land_size && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Luas Tanah</div>
                      <div className="font-medium">{property.land_size} m²</div>
                    </div>
                  )}
                  
                  {property.building_size && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Luas Bangunan</div>
                      <div className="font-medium">{property.building_size} m²</div>
                    </div>
                  )}
                  
                  {property.bedrooms && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Kamar Tidur</div>
                      <div className="font-medium">{property.bedrooms}</div>
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Kamar Mandi</div>
                      <div className="font-medium">{property.bathrooms}</div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {property.description || "Tidak ada deskripsi tersedia untuk properti ini."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Detail Produk</h2>
                <ProductContentDisplay 
                  content={content}
                  loading={loadingContent}
                  error={contentError}
                />
                
                {isRealTimeConnected && (
                  <div className="text-xs text-green-600 mt-4 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    Konten real-time tersinkronisasi
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full mr-3">
                      <Phone size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Telepon</div>
                      <div className="font-medium">+62 812-3456-7890</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full mr-3">
                      <MessageSquare size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium">info@rekaland.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Jadwalkan Kunjungan
                  </Button>
                  <Button variant="outline" className="w-full">
                    Tanya Informasi
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Status Properti</h4>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{property.status === 'available' ? 'Tersedia' : 
                            property.status === 'sold' ? 'Terjual' : 
                            property.status === 'pending' ? 'Dalam Proses' : 
                            property.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
