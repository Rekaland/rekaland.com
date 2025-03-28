
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmptyLotPage = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const emptyLots = [
    {
      id: 1,
      title: "Kavling Premium Jakarta Selatan",
      location: "Jakarta Selatan",
      price: 1500000000,
      size: "200m²",
      image: "https://i.pravatar.cc/300?img=32",
      features: ["Dekat jalan utama", "Bebas banjir", "Sertifikat SHM"],
    },
    {
      id: 2,
      title: "Kavling Strategis Serpong",
      location: "Tangerang",
      price: 800000000,
      size: "150m²",
      image: "https://i.pravatar.cc/300?img=33",
      features: ["Lokasi komersial", "Dekat Mall", "Cocok untuk usaha"],
    },
    {
      id: 3,
      title: "Kavling Bogor Premium",
      location: "Bogor",
      price: 500000000,
      size: "175m²",
      image: "https://i.pravatar.cc/300?img=34",
      features: ["View Pegunungan", "Bebas banjir", "Iklim sejuk"],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredLots = emptyLots.filter(lot => {
    let matchesPrice = true;
    let matchesLocation = true;
    
    if (priceFilter) {
      if (priceFilter === "< 500 Juta") {
        matchesPrice = lot.price < 500000000;
      } else if (priceFilter === "500 Juta - 1 Milyar") {
        matchesPrice = lot.price >= 500000000 && lot.price <= 1000000000;
      } else if (priceFilter === "> 1 Milyar") {
        matchesPrice = lot.price > 1000000000;
      }
    }
    
    if (locationFilter && locationFilter !== "Semua Lokasi") {
      matchesLocation = lot.location === locationFilter;
    }
    
    return matchesPrice && matchesLocation;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Kavling Kosongan</h1>
          <p className="text-gray-600 max-w-3xl">
            Investasi aman dengan tanah kavling premium di lokasi strategis. 
            Miliki aset yang nilainya terus meningkat dan bangun rumah impian sesuai selera Anda.
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
                  <SelectItem value="< 500 Juta">{"< 500 Juta"}</SelectItem>
                  <SelectItem value="500 Juta - 1 Milyar">500 Juta - 1 Milyar</SelectItem>
                  <SelectItem value="> 1 Milyar">{"> 1 Milyar"}</SelectItem>
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
                  <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                  <SelectItem value="Tangerang">Tangerang</SelectItem>
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
          {filteredLots.map((lot) => (
            <Card key={lot.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={lot.image} 
                  alt={lot.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{lot.title}</CardTitle>
                <CardDescription>{lot.location} - {lot.size}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-rekaland-orange mb-2">
                  {formatPrice(lot.price)}
                </p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Fitur:</h4>
                  <ul className="text-sm text-gray-600">
                    {lot.features.map((feature, index) => (
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
        
        {filteredLots.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">Tidak ada kavling yang sesuai dengan filter Anda</h3>
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

export default EmptyLotPage;
