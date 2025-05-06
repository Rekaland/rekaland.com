
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Map, Home, Ruler, Bed, Bath, 
  Tag, User, Calendar, CheckCircle2, 
  X as XIcon, Square, Image 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PropertyDetailProps {
  property: any;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  // Render kategori properti dengan warna yang sesuai
  const renderCategory = (category: string) => {
    switch(category) {
      case 'empty_lot':
        return <Badge className="bg-blue-100 text-blue-800">Kavling Kosongan</Badge>;
      case 'semi_finished':
        return <Badge className="bg-yellow-100 text-yellow-800">Kavling Bangunan</Badge>;
      case 'ready_to_occupy':
        return <Badge className="bg-green-100 text-green-800">Kavling Siap Huni</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };
  
  // Render status properti dengan warna yang sesuai
  const renderStatus = (status: string) => {
    switch(status) {
      case 'available':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Tersedia
          </div>
        );
      case 'sold':
        return (
          <div className="flex items-center text-red-600">
            <XIcon className="mr-2 h-4 w-4" />
            Terjual
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-yellow-600">
            <Clock className="mr-2 h-4 w-4" />
            Pending
          </div>
        );
      default:
        return status;
    }
  };
  
  // Format tanggal
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Judul dan info utama */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          {property.featured && (
            <Badge className="bg-amber-100 text-amber-800">Unggulan</Badge>
          )}
        </div>
        <div className="flex items-center text-gray-500">
          <Map className="h-4 w-4 mr-1" />
          <span>{property.location}</span>
        </div>
      </div>
      
      {/* Galeri gambar */}
      {property.images && property.images.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {property.images.map((image: string, index: number) => (
              <CarouselItem key={`${image}-${index}`}>
                <div className="relative h-[300px]">
                  <img 
                    src={image} 
                    alt={`${property.title} - gambar ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] bg-gray-100 rounded-md">
          <Image className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500">Tidak ada gambar properti</p>
        </div>
      )}
      
      {/* Informasi harga dan detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500 mb-1">Harga</div>
          <div className="text-xl font-bold text-rekaland-orange">
            Rp {formatCurrency(property.price)}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500 mb-1">Kategori</div>
          <div>{renderCategory(property.category)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500 mb-1">Status</div>
          <div>{renderStatus(property.status)}</div>
        </div>
      </div>
      
      {/* Deskripsi */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {property.description || "Tidak ada deskripsi tersedia."}
        </p>
      </div>
      
      <Separator />
      
      {/* Spesifikasi dan Detail */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Detail Properti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {property.land_size && (
              <div className="flex items-center">
                <Square className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700">Luas Tanah: <strong>{property.land_size} m²</strong></span>
              </div>
            )}
            {property.building_size && (
              <div className="flex items-center">
                <Home className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700">Luas Bangunan: <strong>{property.building_size} m²</strong></span>
              </div>
            )}
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700">Kamar Tidur: <strong>{property.bedrooms}</strong></span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700">Kamar Mandi: <strong>{property.bathrooms}</strong></span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {property.address && (
              <div className="flex items-start">
                <Map className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <span className="text-gray-700">
                  Alamat: <strong>{property.address}</strong>
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">
                Ditambahkan: <strong>{formatDate(property.created_at)}</strong>
              </span>
            </div>
            {property.updated_at && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700">
                  Diperbarui: <strong>{formatDate(property.updated_at)}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Info gambar */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Gambar Properti</h2>
        {property.images && property.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.images.map((image: string, index: number) => (
              <div 
                key={`thumbnail-${index}`}
                className="relative aspect-square rounded-md overflow-hidden border"
              >
                <img 
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada gambar tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
