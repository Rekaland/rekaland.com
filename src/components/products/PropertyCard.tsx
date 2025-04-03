
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Ruler, Check, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { PropertyProps } from "@/types/product";

interface PropertyCardProps {
  property: PropertyProps;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    if (property.id) {
      navigate(`/produk/${property.id}`);
    }
  };
  
  const typeToColorMap = {
    'Kavling Kosongan': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Kavling Bangunan': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Kavling Siap Huni': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  };
  
  const typeColor = typeToColorMap[property.type as keyof typeof typeToColorMap] || 'bg-gray-100 text-gray-800';
  
  // Calculate monthly installment (example: 5 years / 60 months)
  const monthlyPayment = property.priceNumeric ? Math.round((property.priceNumeric - (property.dpPrice || 0)) / 60) : 0;
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={`${typeColor} capitalize px-2 py-1 rounded-full text-xs font-medium`}>
            {property.type}
          </Badge>
        </div>
        <button 
          className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Save property"
        >
          <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="mb-2">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" /> 
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-rekaland-orange font-bold text-lg">
              {typeof property.price === 'string' ? property.price : formatCurrency(property.price)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cash
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              Rp {formatCurrency(property.dpPrice || 0)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              DP Kredit
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3 text-sm border-t border-b border-gray-100 dark:border-gray-800 py-2">
          <div className="flex items-center">
            <Ruler className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
            <span>{property.area}</span>
          </div>
          <div className="text-xs flex gap-1">
            <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">Cash</span>
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">Kredit</span>
          </div>
        </div>
        
        <div className="mb-1">
          <h4 className="text-sm font-medium mb-1.5">Fitur:</h4>
          <ul className="space-y-1">
            {property.features?.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-xs">
                <Check className="h-3.5 w-3.5 mr-1.5 text-rekaland-orange mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button 
          onClick={handleViewDetails}
          className="w-full bg-rekaland-orange hover:bg-orange-600"
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};
