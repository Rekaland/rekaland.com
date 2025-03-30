
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/products/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedPropertiesSection = () => {
  const navigate = useNavigate();
  const { properties, loading, error } = useProperties(true, undefined, 3);
  
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
  
  // Tampilkan data dari API atau fallback ke data mock jika kosong
  const displayProperties = properties.length > 0 ? properties : [
    {
      id: "1",
      title: "Hunian Premium Jakarta",
      location: "Jakarta Selatan",
      price: 350000000,
      description: "Hunian premium dengan desain modern dan fasilitas lengkap.",
      category: "ready_to_occupy",
      status: "available",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Kavling Strategis BSD",
      location: "Tangerang Selatan",
      price: 400000000,
      description: "Kavling strategis di area berkembang dengan ROI tinggi.",
      category: "empty_lot",
      status: "available",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Rumah Setengah Jadi Bekasi",
      location: "Bekasi",
      price: 550000000,
      description: "Rumah setengah jadi dengan struktur kokoh dan desain modern.",
      category: "semi_finished",
      status: "available",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                title: property.title,
                location: property.location,
                type: property.category === 'empty_lot' 
                  ? 'Kavling Kosongan' 
                  : property.category === 'semi_finished' 
                    ? 'Kavling Bangunan' 
                    : 'Kavling Siap Huni',
                price: `Rp ${(property.price / 1000000).toFixed(0)}jt`,
                area: property.land_size ? `${property.land_size} m²` : "120 m²",
                image: property.images?.length ? property.images[0] : "https://source.unsplash.com/random/300x200?property&sig=" + property.id,
                features: [
                  property.bedrooms ? `${property.bedrooms} kamar tidur` : "Akses mudah",
                  property.bathrooms ? `${property.bathrooms} kamar mandi` : "Lokasi strategis",
                  "Sertifikat SHM"
                ]
              }}
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
