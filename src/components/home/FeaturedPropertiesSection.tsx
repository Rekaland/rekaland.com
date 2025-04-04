
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/products/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Skeleton } from '@/components/ui/skeleton';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';
import { getCategoryPath, formatCurrency } from '@/lib/utils';
import { PropertyProps } from '@/types/product';

const FeaturedPropertiesSection = () => {
  const navigate = useNavigate();
  const { properties, loading, error, refetchProperties } = useProperties(true, undefined, 3);
  
  // Setup real-time listening untuk update properti
  const { isSubscribed } = useRealTimeSync('properties', refetchProperties);
  
  // Tampilkan skeleton loader selama data dimuat
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Properti Unggulan</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Temukan properti premium kami dengan lokasi strategis dan harga terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden shadow-lg">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate('/produk')} 
              className="bg-rekaland-orange hover:bg-orange-600 text-white"
            >
              Lihat Semua Properti
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  // Mendapatkan kategori URL dari kategori properti
  const getCategoryFromType = (category: string) => {
    return getCategoryPath(category);
  };
  
  // Format properti untuk ditampilkan
  const formatPropertiesForDisplay = (): PropertyProps[] => {
    return properties.map(property => ({
      id: property.id,
      title: property.title,
      location: property.location,
      type: property.category === 'empty_lot' 
        ? 'Kavling Kosongan' 
        : property.category === 'semi_finished' 
          ? 'Kavling Bangunan' 
          : 'Kavling Siap Huni',
      price: `Rp ${formatCurrency(property.price)}`,
      priceNumeric: property.price,
      dpPrice: property.price * 0.3,
      area: property.land_size ? `${property.land_size} m²` : "120 m²",
      image: property.images?.length ? property.images[0] : `https://source.unsplash.com/random/300x200?property&sig=${property.id}`,
      category: getCategoryFromType(property.category),
      features: [
        property.bedrooms ? `${property.bedrooms} kamar tidur` : "Akses mudah",
        property.bathrooms ? `${property.bathrooms} kamar mandi` : "Lokasi strategis",
        "Sertifikat SHM"
      ]
    }));
  };
  
  // Tampilkan data dari API atau fallback ke data mock jika kosong
  const displayProperties: PropertyProps[] = properties.length > 0 
    ? formatPropertiesForDisplay() 
    : [
        {
          id: "1",
          title: "Hunian Premium Jakarta",
          location: "Jakarta Selatan",
          type: "Kavling Siap Huni",
          price: "Rp 350jt",
          priceNumeric: 350000000,
          dpPrice: 105000000,
          area: "120 m²",
          image: "https://source.unsplash.com/random/300x200?property&sig=1",
          category: "kavling-siap-huni",
          features: ["Akses mudah", "Lokasi strategis", "Sertifikat SHM"]
        },
        {
          id: "2",
          title: "Kavling Strategis BSD",
          location: "Tangerang Selatan",
          type: "Kavling Kosongan",
          price: "Rp 400jt",
          priceNumeric: 400000000,
          dpPrice: 120000000,
          area: "150 m²",
          image: "https://source.unsplash.com/random/300x200?property&sig=2",
          category: "kavling-kosongan",
          features: ["Bebas banjir", "Lokasi premium", "ROI tinggi"]
        },
        {
          id: "3",
          title: "Rumah Setengah Jadi Bekasi",
          location: "Bekasi",
          type: "Kavling Bangunan",
          price: "Rp 550jt",
          priceNumeric: 550000000,
          dpPrice: 165000000,
          area: "180 m²",
          image: "https://source.unsplash.com/random/300x200?property&sig=3",
          category: "kavling-setengah-jadi",
          features: ["Struktur kokoh", "Desain modern", "Lingkungan asri"]
        }
      ];
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Properti Unggulan</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan properti premium kami dengan lokasi strategis dan harga terbaik
          </p>
          {isSubscribed && (
            <div className="text-xs text-green-600 mt-2 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              Update real-time aktif
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            onClick={() => navigate('/produk')} 
            className="bg-rekaland-orange hover:bg-orange-600 text-white"
          >
            Lihat Semua Properti
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
