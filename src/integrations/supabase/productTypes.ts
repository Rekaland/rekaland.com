
export interface ProductContentDB {
  id: string;
  product_id: string;
  title: string;
  description: string;
  features?: any; // Tipe JSON di Supabase
  specifications?: any; // Tipe JSON di Supabase
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductContent {
  id: string;
  product_id: string;
  title: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export const convertDBToProductContent = (dbData: ProductContentDB): ProductContent => {
  if (!dbData) return null as any;

  return {
    id: dbData.id,
    product_id: dbData.product_id,
    title: dbData.title,
    description: dbData.description,
    features: Array.isArray(dbData.features) ? dbData.features : [],
    specifications: typeof dbData.specifications === 'object' ? dbData.specifications : {},
    meta_description: dbData.meta_description,
    created_at: dbData.created_at,
    updated_at: dbData.updated_at
  };
};

export const convertProductContentToDB = (content: ProductContent): ProductContentDB => {
  return {
    id: content.id,
    product_id: content.product_id,
    title: content.title,
    description: content.description,
    features: content.features || [],
    specifications: content.specifications || {},
    meta_description: content.meta_description,
    created_at: content.created_at,
    updated_at: content.updated_at
  };
};
