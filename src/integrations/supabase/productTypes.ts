
// Tipe untuk konten produk yang disimpan di Supabase
export interface ProductContentDB {
  id: string;
  product_id?: string;
  title: string;
  description: string;
  features: any; // JSONB di database
  specifications: any; // JSONB di database
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Tipe untuk digunakan pada frontend dengan features dan specifications yang sudah diubah ke tipe spesifik
export interface ProductContent {
  id: string;
  product_id?: string;
  title: string;
  description: string;
  features: string[];
  specifications?: Record<string, string>;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function untuk memastikan tipe data sesuai
export function convertDBToProductContent(dbContent: ProductContentDB | null): ProductContent | null {
  if (!dbContent) return null;
  
  // Parse features jika dalam format string
  let features = dbContent.features || [];
  if (typeof features === 'string') {
    try {
      features = JSON.parse(features);
    } catch (e) {
      features = [String(features)];
    }
  }

  // Parse specifications jika dalam format string
  let specifications = dbContent.specifications || {};
  if (typeof specifications === 'string') {
    try {
      specifications = JSON.parse(specifications);
    } catch (e) {
      specifications = {};
    }
  }

  return {
    ...dbContent,
    features: Array.isArray(features) ? features : [],
    specifications: typeof specifications === 'object' ? specifications : {}
  };
}
