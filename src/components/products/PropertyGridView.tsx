
import { PropertyCard } from "@/components/products/PropertyCard";
import { PropertyProps } from "@/types/product";

interface PropertyGridViewProps {
  properties: PropertyProps[];
}

export const PropertyGridView = ({ properties }: PropertyGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
