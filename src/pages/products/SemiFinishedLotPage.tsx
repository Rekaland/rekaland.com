
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SemiFinishedLotPage = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const semiFinishedLots = [
    {
      id: 1,
      title: "Rumah Pantura Type 45",
      location: "Bekasi",
      price: 650000000,
      size: "45/70m²",
      type: "Type 45",
      image: "https://i.pravatar.cc/300?img=35",
      features: ["2 Kamar Tidur", "1 Kamar Mandi", "Tinggal finishing interior"],
    },
    {
      id: 2,
      title: "Rumah Jati Padang Type 60",
      location: "Jakarta Selatan",
      price: 950000000,
      size: "60/100m²",
      type: "Type 60",
      image: "https://i.pravatar.cc/300?img=36",
      features: ["3 Kamar Tidur", "2 Kamar Mandi", "Struktur kokoh"],
    },
    {
      id: 3,
      title: "Rumah Minimalis Serpong Type 36",
      location: "Tangerang",
      price: 550000000,
      size: "36/60m²",
      type: "Type 36",
      image: "https://i.pravatar.cc/300?img=37",
      features: ["2 Kamar Tidur", "1 Kamar Mandi", "Lokasi strategis"],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredLots = semiFinishedLots.filter(lot => {
    let matchesPrice = true;
    let matchesType = true;
    
    if (priceFilter) {
      if (priceFilter === "< 600 Juta") {
        matchesPrice = lot.price < 600000000;
      } else if (priceFilter === "600 - 800 Juta") {
        matchesPrice = lot.price >= 600000000 && lot.price <= 800000000;
      } else if (priceFilter === "> 800 Juta") {
        matchesPrice = lot.price > 800000000;
      }
    }
    
    if (typeFilter && typeFilter !== "Semua Tipe") {
      matchesType = lot.type === typeFilter;
    }
    
    return matchesPrice && matchesType;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Kavling Setengah Jadi</h1>
          <p className="text-gray-600 max-w-3xl">
            Rumah setengah jadi dengan struktur yang kokoh dan desain yang sudah dirancang dengan baik.
            Anda dapat menyelesaikan finishing sesuai dengan keinginan dan anggaran Anda.
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
                  <SelectItem value="< 600 Juta">{"< 600 Juta"}</SelectItem>
                  <SelectItem value="600 - 800 Juta">600 - 800 Juta</SelectItem>
                  <SelectItem value="> 800 Juta">{"> 800 Juta"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipe Rumah</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Pilih tipe rumah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Tipe</SelectItem>
                  <SelectItem value="Type 36">Type 36</SelectItem>
                  <SelectItem value="Type 45">Type 45</SelectItem>
                  <SelectItem value="Type 60">Type 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Kata Kunci</Label>
              <Input id="search" placeholder="Cari berdasarkan nama/lokasi" />
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
                  <h4 className="text-sm font-medium mb-1">Spesifikasi:</h4>
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
            <h3 className="text-xl font-medium mb-2">Tidak ada properti yang sesuai dengan filter Anda</h3>
            <p className="text-gray-500 mb-4">Coba ubah filter pencarian untuk melihat hasil lainnya</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setPriceFilter("");
                setTypeFilter("");
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

export default SemiFinishedLotPage;
