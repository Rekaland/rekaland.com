
// Type definitions for product content management

import { Json } from "@/integrations/supabase/client";

export interface ProductContentDB {
  id: string;
  product_id?: string | null;
  title: string;
  description: string;
  features?: string[] | Json | any; // Support for various feature formats
  specifications?: Record<string, any> | Json | any; // Support for different specification formats
  meta_description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductContent {
  id: string;
  product_id?: string | null;
  title: string;
  description: string;
  features?: string[];
  specifications?: Record<string, any>;
  meta_description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Function to convert DB data to ProductContent interface
export const convertDBToProductContent = (data: ProductContentDB | null): ProductContent | null => {
  if (!data) return null;
  
  // Parse features if it's a JSON string or ensure it's an array
  let parsedFeatures: string[] = [];
  if (data.features) {
    try {
      if (Array.isArray(data.features)) {
        parsedFeatures = data.features;
      } else if (typeof data.features === 'string') {
        parsedFeatures = JSON.parse(data.features);
      } else if (data.features && typeof data.features === 'object') {
        // Handle case where features is a JSON object from Supabase
        parsedFeatures = Array.isArray(data.features) ? data.features : [];
      }
    } catch (e) {
      console.error("Error parsing features:", e);
      parsedFeatures = [];
    }
  }
  
  // Parse specifications if it's a JSON string or ensure it's an object
  let parsedSpecifications: Record<string, any> = {};
  if (data.specifications) {
    try {
      if (typeof data.specifications === 'object' && !Array.isArray(data.specifications)) {
        parsedSpecifications = data.specifications;
      } else if (typeof data.specifications === 'string') {
        parsedSpecifications = JSON.parse(data.specifications);
      } else if (data.specifications && typeof data.specifications === 'object') {
        // Handle JSON object from Supabase
        parsedSpecifications = data.specifications;
      }
    } catch (e) {
      console.error("Error parsing specifications:", e);
      parsedSpecifications = {};
    }
  }
  
  return {
    id: data.id,
    product_id: data.product_id,
    title: data.title,
    description: data.description,
    features: parsedFeatures,
    specifications: parsedSpecifications,
    meta_description: data.meta_description,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};
