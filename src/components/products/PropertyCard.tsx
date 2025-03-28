
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Check } from "lucide-react";

interface PropertyProps {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  area: string;
  image: string;
  features: string[];
}

interface PropertyCardProps {
  property: PropertyProps;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo, saya tertarik dan ingin tahu lebih lanjut tentang properti "${property.title}" yang berlokasi di ${property.location} dengan harga ${property.price}.`
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
      <div className="relative h-60">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover" 
        />
        <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
          {property.type}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="font-bold text-rekaland-orange">{property.price}</span>
          <span className="text-gray-500">{property.area}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="grid grid-cols-1 gap-1 mb-3">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Check size={14} className="text-green-500 mr-2" />
                {feature}
              </div>
            ))}
          </div>
          <Button 
            onClick={openWhatsApp}
            className="w-full bg-gray-100 text-rekaland-black hover:bg-rekaland-orange hover:text-white transition-colors"
          >
            Hubungi Kami <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
