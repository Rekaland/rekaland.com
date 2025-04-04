
// Type definitions for product content management
import { content } from "i18next";

export interface ProductContentDB {
  id: string;
  product_id?: string;
  title: string;
  description: string;
  features?: string[];
  specifications?: Record<string, any>;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductContent {
  id: string;
  product_id?: string;
  title: string;
  description: string;
  features?: string[];
  specifications?: Record<string, any>;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Function to convert DB data to ProductContent interface
export const convertDBToProductContent = (data: ProductContentDB | null): ProductContent | null => {
  if (!data) return null;
  
  return {
    id: data.id,
    product_id: data.product_id,
    title: data.title,
    description: data.description,
    features: Array.isArray(data.features) ? data.features : [],
    specifications: data.specifications || {},
    meta_description: data.meta_description,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};
