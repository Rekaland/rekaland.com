
import { ReactNode } from "react";

export interface CategoryProps {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  path: string;
}

export interface PropertyProps {
  id: string | number;
  title: string;
  location: string;
  price: string;
  priceNumeric?: number;
  dpPrice?: number;
  area: string;
  type: string;
  image: string;
  features: string[];
  category?: string;
}
