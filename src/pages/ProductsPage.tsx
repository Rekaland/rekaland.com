
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductsPage = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Sample data for all property types
  const emptyLots = [
    {
      id: 1,
      title: "Kavling Premium Jakarta Selatan",
      location: "Jakarta Selatan",
      price: 1800000000,
      size: "200m²",
      image: "https://i.pravatar.cc/300?img=32",
      features: ["Hook", "Lebar jalan 8 meter", "Sertifikat SHM"],
    },
    {
      id: 2,
      title: "Kavling Strategis Bogor",
      location: "Bogor",
      price: 900000000,
      size: "150m²",
      image: "https://i.pravatar.cc/300?img=33",
      features: ["Bebas banjir", "Dekat transportasi umum", "Sertifikat SHM"],
    },
  ];

  const semiFinishedProperties = [
    {
      id: 1,
      title: "Rumah Setengah Jadi Depok",
      location: "Depok",
      price: 1500000000,
      size: "120m²",
      progress: 60,
      image: "https://i.pravatar.cc/300?img=34",
      features: ["Pondasi kuat", "Kerangka beton", "Instalasi listrik", "Plumbing"],
    },
    {
      id: 2,
      title: "Villa Setengah Jadi Sentul",
      location: "Bogor",
      price: 2200000000,
      size: "180m²",
      progress: 70,
      image: "https://i.pravatar.cc/300?img=38",
      features: ["Desain modern", "View pegunungan", "Kerangka baja", "Atap terpasang"],
    },
  ];

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
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Apply filters based on active tab
  const filterProperties = (properties: any[], filterPrice: string, filterLocation: string) => {
    return properties.filter(property => {
      let matchesPrice = true;
      let matchesLocation = true;
      
      if (filterPrice) {
        if (filterPrice === "< 1.5 Milyar") {
          matchesPrice = property.price < 1500000000;
        } else if (filterPrice === "1.5 - 2 Milyar") {
          matchesPrice = property.price >= 1500000000 && property.price <= 2000000000;
        } else if (filterPrice === "> 2 Milyar") {
          matchesPrice = property.price > 2000000000;
        }
      }
      
      if (filterLocation && filterLocation !== "Semua Lokasi") {
        matchesLocation = property.location === filterLocation;
      }
      
      return matchesPrice && matchesLocation;
    });
  };

  const filteredEmptyLots = filterProperties(emptyLots, priceFilter, locationFilter);
  const filteredSemiFinishedProperties = filterProperties(semiFinishedProperties, priceFilter, locationFilter);
  const filteredReadyToOccupyProperties = filterProperties(readyToOccupyProperties, priceFilter, locationFilter);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Katalog Produk</h1>
          <p className="text-gray-600 max-w-3xl">
            Temukan berbagai pilihan properti berkualitas dari Rekaland, mulai dari kavling kosongan, bangunan setengah jadi, hingga properti siap huni.
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
                  <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                  <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                  <SelectItem value="Bogor">Bogor</SelectItem>
                  <SelectItem value="Depok">Depok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Kata Kunci</Label>
              <Input id="search" placeholder="Cari berdasarkan nama" />
            </div>
          </div>

          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setPriceFilter("");
              setLocationFilter("");
            }}
          >
            Reset Filter
          </Button>
        </div>
        
        {/* Product Category Tabs */}
        <Tabs defaultValue="empty-lot" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="empty-lot">Kavling Kosongan</TabsTrigger>
            <TabsTrigger value="semi-finished">Kavling dan Bangunan Setengah Jadi</TabsTrigger>
            <TabsTrigger value="ready">Kavling Siap Huni</TabsTrigger>
          </TabsList>
          
          {/* Empty Lot Tab */}
          <TabsContent value="empty-lot">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmptyLots.map((property) => (
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
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Fitur:</h4>
                      <ul className="text-sm text-gray-600">
                        {property.features.map((feature: string, index: number) => (
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
              
              {filteredEmptyLots.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium mb-2">Tidak ada properti yang sesuai dengan filter Anda</h3>
                  <p className="text-gray-500 mb-4">Coba ubah filter pencarian untuk melihat hasil lainnya</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Semi-Finished Tab */}
          <TabsContent value="semi-finished">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSemiFinishedProperties.map((property) => (
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
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Progress Pembangunan: {property.progress}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-rekaland-orange h-2.5 rounded-full" 
                          style={{ width: `${property.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Fitur:</h4>
                      <ul className="text-sm text-gray-600">
                        {property.features.map((feature: string, index: number) => (
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
              
              {filteredSemiFinishedProperties.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium mb-2">Tidak ada properti yang sesuai dengan filter Anda</h3>
                  <p className="text-gray-500 mb-4">Coba ubah filter pencarian untuk melihat hasil lainnya</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Ready-to-Occupy Tab */}
          <TabsContent value="ready">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReadyToOccupyProperties.map((property) => (
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
                        {property.features.map((feature: string, index: number) => (
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
              
              {filteredReadyToOccupyProperties.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium mb-2">Tidak ada properti yang sesuai dengan filter Anda</h3>
                  <p className="text-gray-500 mb-4">Coba ubah filter pencarian untuk melihat hasil lainnya</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductsPage;
