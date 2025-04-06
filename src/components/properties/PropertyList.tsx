
import React from "react";
import { PropertyProps } from "@/types/product";
import { PropertyCard } from "@/components/products/PropertyCard";
import { motion } from "framer-motion";

interface PropertyListProps {
  properties: PropertyProps[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div 
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  );
};
