
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
