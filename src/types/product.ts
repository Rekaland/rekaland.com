
import { ReactNode } from "react";

// Define types for property categories
export interface CategoryProps {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  path: string;
}

// Define type for property data displayed in UI
export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  priceNumeric: number;
  dpPrice?: number;
  area: string;
  image: string;
  category: string;
  features: string[];
}

// Define property filter options
export interface PropertyFilterOptions {
  priceRange?: [number, number];
  areaRange?: [number, number];
  categories?: string[];
  features?: string[];
  locations?: string[];
}
