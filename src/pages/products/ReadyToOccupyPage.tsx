
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReadyToOccupyPage = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const readyToOccupyProperties = [
    {
      id: 1,
      title: "Rumah Modern Jakarta Timur",
      location: "Jakarta Timur",
      price: 2500000000,
      size: "120m²",
      bedrooms: 3,
      bathrooms: 2,
      image: "https://i.pravatar.cc/300?img=35",
      features: ["Taman luas", "Carport 2 mobil", "Fully furnished"],
    },
    {
      id: 2,
      title: "Rumah Asri Bogor",
      location: "Bogor",
      price: 1800000000,
      size: "150m²",
      bedrooms: 4,
      bathrooms: 3,
      image: "https://i.pravatar.cc/300?img=36",
      features: ["Swimming pool", "Taman belakang", "Smart home system"],
    },
    {
      id: 3,
      title: "Rumah Minimalis Bekasi",
      location: "Bekasi",
      price: 1200000000,
      size: "100m²",
      bedrooms: 3,
      bathrooms: 2,
      image: "https://i.pravatar.cc/300?img=37",
      features: ["Keamanan 24 jam", "Cluster premium", "Dekat tol"],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProperties = readyToOccupyProperties.filter(property => {
    let matchesPrice = true;
    let matchesLocation = true;
    
    if (priceFilter) {
      if (priceFilter === "< 1.5 Milyar") {
        matchesPrice = property.price < 1500000000;
      } else if (priceFilter === "1.5 - 2 Milyar") {
        matchesPrice = property.price >= 1500000000 && property.price <= 2000000000;
      } else if (priceFilter === "> 2 Milyar") {
        matchesPrice = property.price > 2000000000;
      }
    }
    
    if (locationFilter && locationFilter !== "Semua Lokasi") {
      matchesLocation = property.location === locationFilter;
    }
    
    return matchesPrice && matchesLocation;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Rumah Siap Huni</h1>
          <p className="text-gray-600 max-w-3xl">
            Temukan rumah impian yang siap untuk Anda tempati. Berbagai pilihan desain modern dengan fasilitas lengkap dan lokasi strategis di seluruh Indonesia.
          </p>
        </div>
        
        {/* Filter Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-10">
          <h2 className="font-semibold mb-4">Filter Pencarian</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price-range">Rentang Harga</Label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger id="price-range">
                  <SelectValue placeholder="Pilih rentang harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Harga</SelectItem>
                  <SelectItem value="< 1.5 Milyar">{"< 1.5 Milyar"}</SelectItem>
                  <SelectItem value="1.5 - 2 Milyar">1.5 - 2 Milyar</SelectItem>
                  <SelectItem value="> 2 Milyar">{"> 2 Milyar"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Lokasi</SelectItem>
                  <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                  <SelectItem value="Bekasi">Bekasi</SelectItem>
                  <SelectItem value="Bogor">Bogor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Kata Kunci</Label>
              <Input id="search" placeholder="Cari berdasarkan nama" />
            </div>
          </div>
        </div>
        
        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription>{property.location} - {property.size}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-rekaland-orange mb-2">
                  {formatPrice(property.price)}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{property.bedrooms}</span> Kamar
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{property.bathrooms}</span> Kamar Mandi
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Fitur:</h4>
                  <ul className="text-sm text-gray-600">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-1 mb-1">
                        <span className="text-green-500 text-lg">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-rekaland-orange hover:bg-orange-600">
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">Tidak ada properti yang sesuai dengan filter Anda</h3>
            <p className="text-gray-500 mb-4">Coba ubah filter pencarian untuk melihat hasil lainnya</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setPriceFilter("");
                setLocationFilter("");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReadyToOccupyPage;
