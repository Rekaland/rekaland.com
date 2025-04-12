
import { PropertyCard } from "@/components/products/PropertyCard";
import { PropertyProps } from "@/types/product";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PropertyGridViewProps {
  properties: PropertyProps[];
  emptyMessage?: string;
}

export const PropertyGridView = ({ properties, emptyMessage = "Tidak ada properti yang ditemukan" }: PropertyGridViewProps) => {
  const navigate = useNavigate();
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full p-3 w-16 h-16 flex items-center justify-center">
          <Home className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Tidak Ada Properti Ditemukan</h3>
        <p className="text-gray-500 mb-4">
          {emptyMessage}
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/produk")}
        >
          Lihat Semua Properti
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
