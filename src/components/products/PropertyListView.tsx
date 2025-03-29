
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyProps } from "@/types/product";
import { MapPin, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyListViewProps {
  properties: PropertyProps[];
}

export const PropertyListView = ({ properties }: PropertyListViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mb-12">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-1/3 h-60 md:h-auto">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
                {property.type}
              </span>
            </div>
            <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                <div className="flex items-center mb-3 text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-rekaland-orange">{property.price}</span>
                  <span className="text-gray-500">{property.area}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-1 mb-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check size={14} className="text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={() => navigate(`/produk/detail/${property.id}`)}
                  className="bg-gray-100 text-rekaland-black hover:bg-gray-200"
                  variant="outline"
                >
                  Lihat Detail
                </Button>
                <Button 
                  className="bg-rekaland-orange hover:bg-orange-600 text-white"
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Halo, saya tertarik dan ingin tahu lebih lanjut tentang properti "${property.title}" yang berlokasi di ${property.location} dengan harga ${property.price}.`
                    );
                    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
                  }}
                >
                  Hubungi Agen <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
