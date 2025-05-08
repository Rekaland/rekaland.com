
import React from "react";
import { 
  Home, MapPin, DollarSign, Ruler, ShowerHead, 
  Bed, Check, Link, Maximize, ArrowUpRight, User, 
  Phone, Mail, CircleDashed, Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyDetailProps {
  property: any;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
          <TabsTrigger value="features">Fitur & Fasilitas</TabsTrigger>
          <TabsTrigger value="marketing">Info Marketing</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
        </TabsList>
        
        {/* Tab Overview */}
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Informasi Dasar</h3>
                  <Separator className="my-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Harga</div>
                      <div className="text-lg font-semibold">Rp {formatCurrency(property.price)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Status</div>
                      <div>
                        {property.status === 'available' && (
                          <Badge className="bg-green-100 text-green-800">Tersedia</Badge>
                        )}
                        {property.status === 'sold' && (
                          <Badge className="bg-red-100 text-red-800">Terjual</Badge>
                        )}
                        {property.status === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {property.land_size && (
                    <div className="flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Luas Tanah</div>
                        <div>{property.land_size} m²</div>
                      </div>
                    </div>
                  )}
                  
                  {property.building_size && (
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Luas Bangunan</div>
                        <div>{property.building_size} m²</div>
                      </div>
                    </div>
                  )}
                  
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Kamar Tidur</div>
                        <div>{property.bedrooms}</div>
                      </div>
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <ShowerHead className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Kamar Mandi</div>
                        <div>{property.bathrooms}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-md font-medium">Kategori</h3>
                  <div className="mt-1">
                    {property.category === 'empty_lot' && (
                      <Badge variant="outline" className="bg-blue-50">Kavling Kosongan</Badge>
                    )}
                    {property.category === 'semi_finished' && (
                      <Badge variant="outline" className="bg-yellow-50">Kavling Bangunan</Badge>
                    )}
                    {property.category === 'ready_to_occupy' && (
                      <Badge variant="outline" className="bg-green-50">Kavling Siap Huni</Badge>
                    )}
                    
                    {property.featured && (
                      <Badge className="ml-2 bg-orange-100 text-orange-800">Unggulan</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div>
                  <h3 className="text-lg font-medium">Kontak Informasi</h3>
                  <Separator className="my-2" />
                </div>
                
                <div className="space-y-4 mt-4">
                  {property.contact_person && (
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Kontak Person</div>
                        <div>{property.contact_person}</div>
                      </div>
                    </div>
                  )}
                  
                  {property.contact_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Telepon</div>
                        <div>{property.contact_phone}</div>
                      </div>
                    </div>
                  )}
                  
                  {property.contact_email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div>{property.contact_email}</div>
                      </div>
                    </div>
                  )}
                  
                  {(!property.contact_person && !property.contact_phone && !property.contact_email) && (
                    <div className="text-gray-500 italic">
                      Belum ada informasi kontak yang ditambahkan
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium">SEO & Metadata</h3>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="text-sm font-medium">Meta Description</div>
                    <p className="text-sm text-gray-500 mt-1">
                      {property.meta_description || "Belum ada meta description yang ditambahkan"}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  {property.virtual_tour_url && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={property.virtual_tour_url} target="_blank" rel="noopener">
                        <Link className="mr-2 h-4 w-4" />
                        Lihat Virtual Tour
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  
                  {property.location_map_url && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={property.location_map_url} target="_blank" rel="noopener">
                        <MapPin className="mr-2 h-4 w-4" />
                        Lihat Peta Lokasi
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">Deskripsi</h3>
                <Separator className="my-2" />
              </div>
              <div className="mt-2 whitespace-pre-wrap">
                {property.description || "Belum ada deskripsi yang ditambahkan"}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab Spesifikasi */}
        <TabsContent value="specifications" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">Spesifikasi Teknis</h3>
                <Separator className="my-2" />
              </div>
              
              {property.specifications && Object.keys(property.specifications).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
                  {Object.entries(property.specifications).map(([key, value], index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key}</span>
                      <span>{value as string}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic mt-4">
                  Belum ada spesifikasi teknis yang ditambahkan
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab Fitur & Fasilitas */}
        <TabsContent value="features" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <div>
                  <h3 className="text-lg font-medium">Fitur & Keunggulan</h3>
                  <Separator className="my-2" />
                </div>
                
                {property.features && property.features.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {property.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500 italic mt-4">
                    Belum ada fitur yang ditambahkan
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div>
                  <h3 className="text-lg font-medium">Fasilitas & Amenitas</h3>
                  <Separator className="my-2" />
                </div>
                
                {property.amenities && property.amenities.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {property.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CircleDashed className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500 italic mt-4">
                    Belum ada fasilitas yang ditambahkan
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Tab Marketing */}
        <TabsContent value="marketing" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">Opsi Pembayaran</h3>
                <Separator className="my-2" />
              </div>
              
              {property.payment_options && property.payment_options.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {property.payment_options.map((option: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 italic mt-4">
                  Belum ada opsi pembayaran yang ditambahkan
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">FAQ</h3>
                <Separator className="my-2" />
              </div>
              
              {property.faqs && property.faqs.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {property.faqs.map((faq: {question: string, answer: string}, index: number) => (
                    <div key={index} className="border-b pb-4">
                      <h4 className="font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2 text-amber-500" />
                        {faq.question}
                      </h4>
                      <p className="mt-1 text-gray-600 pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic mt-4">
                  Belum ada FAQ yang ditambahkan
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab Galeri */}
        <TabsContent value="gallery" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">Foto Properti</h3>
                <Separator className="my-2" />
              </div>
              
              {property.images && property.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {property.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden border">
                      <img 
                        src={image} 
                        alt={`${property.title} - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic mt-4">
                  Belum ada foto properti yang ditambahkan
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div>
                <h3 className="text-lg font-medium">Denah Rumah (Floor Plan)</h3>
                <Separator className="my-2" />
              </div>
              
              {property.floor_plan_images && property.floor_plan_images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {property.floor_plan_images.map((image: string, index: number) => (
                    <div key={index} className="rounded-md overflow-hidden border">
                      <img 
                        src={image} 
                        alt={`${property.title} - Denah ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic mt-4">
                  Belum ada denah rumah yang ditambahkan
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetail;
