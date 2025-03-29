
import { ReactNode } from "react";

export interface CategoryProps {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  path: string;
}

export interface PropertyProps {
  id: number;
  title: string;
  location: string;
  price: string;
  area: string;
  type: string;
  image: string;
  features: string[];
}
