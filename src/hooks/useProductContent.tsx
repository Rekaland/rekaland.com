
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useRealTimeSync } from './useRealTimeSync';
import { ProductContent, ProductContentDB } from '@/integrations/supabase/productTypes';

export { type ProductContent } from '@/integrations/supabase/productTypes';

export const useProductContent = (productId?: string) => {
  const [content, setContent] = useState<ProductContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Menggunakan real-time sync untuk memperbarui konten produk
  const { isSubscribed } = useRealTimeSync('product_contents', fetchProductContent);

  // Fungsi untuk mengambil konten produk
  async function fetchProductContent() {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching product content for ID:", productId);
      
      // Query konten produk dari Supabase
      const { data, error } = await supabase
        .from('product_contents')
        .select('*')
        .eq('product_id', productId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching product content:", error);
        throw error;
      }
      
      if (data) {
        console.log("Product content found:", data);
        // Parse features jika dalam format string
        let features = data.features || [];
        if (typeof features === 'string') {
          try {
            features = JSON.parse(features);
          } catch (e) {
            features = [features];
          }
        }

        // Parse specifications jika dalam format string
        let specifications = data.specifications || {};
        if (typeof specifications === 'string') {
          try {
            specifications = JSON.parse(specifications);
          } catch (e) {
            specifications = {};
          }
        }

        setContent({
          ...data, 
          features, 
          specifications
        });
      } else {
        console.log("No product content found for ID:", productId);
        setContent(null);
      }
    } catch (err: any) {
      console.error("Error in useProductContent:", err);
      setError(err.message);
      
      toast({
        title: "Gagal memuat konten produk",
        description: "Terjadi kesalahan saat mengambil data dari server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // Muat konten produk saat komponen dimuat atau productId berubah
  useEffect(() => {
    fetchProductContent();
  }, [productId]);

  // Fungsi untuk menyimpan konten produk
  const saveProductContent = async (contentData: ProductContent) => {
    try {
      let result;
      
      if (contentData.id) {
        // Update konten yang sudah ada
        result = await supabase
          .from('product_contents')
          .update({
            title: contentData.title,
            description: contentData.description,
            features: contentData.features,
            specifications: contentData.specifications,
            meta_description: contentData.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', contentData.id);
      } else {
        // Buat konten baru
        result = await supabase
          .from('product_contents')
          .insert({
            product_id: productId,
            title: contentData.title,
            description: contentData.description,
            features: contentData.features,
            specifications: contentData.specifications,
            meta_description: contentData.meta_description
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Muat ulang konten setelah perubahan
      await fetchProductContent();
      
      toast({
        title: "Konten tersimpan!",
        description: "Perubahan pada konten produk berhasil disimpan",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
      
      return { success: true };
    } catch (err: any) {
      console.error('Error saving product content:', err);
      
      toast({
        title: "Gagal menyimpan konten",
        description: err.message || "Terjadi kesalahan saat menyimpan ke database",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  return { 
    content, 
    loading, 
    error, 
    fetchProductContent,
    saveProductContent,
    isRealTimeConnected: isSubscribed
  };
};
