
import { useState, useEffect, useCallback } from "react";
import { supabase, Property } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

// Helper function to map URL category to database category
export const mapUrlCategoryToDbCategory = (urlCategory?: string): string | undefined => {
  if (!urlCategory || urlCategory === 'all') return undefined;
  
  if (urlCategory === 'kavling-kosongan' || urlCategory === 'empty_lot') {
    return 'empty_lot';
  } else if (urlCategory === 'kavling-setengah-jadi' || urlCategory === 'semi_finished') {
    return 'semi_finished';
  } else if (urlCategory === 'kavling-siap-huni' || urlCategory === 'ready_to_occupy') {
    return 'ready_to_occupy';
  }
  
  return undefined;
};

// Helper untuk konversi kategori database ke URL path
export const mapDbCategoryToUrlCategory = (dbCategory: string): string => {
  if (dbCategory === 'empty_lot') {
    return 'kavling-kosongan';
  } else if (dbCategory === 'semi_finished') {
    return 'kavling-setengah-jadi';
  } else if (dbCategory === 'ready_to_occupy') {
    return 'kavling-siap-huni';
  }
  
  return 'unknown-category';
};

// Helper untuk konversi kategori database ke nama tampilan
export const mapDbCategoryToDisplayName = (dbCategory: string): string => {
  if (dbCategory === 'empty_lot') {
    return 'Kavling Kosongan';
  } else if (dbCategory === 'semi_finished') {
    return 'Kavling Bangunan';
  } else if (dbCategory === 'ready_to_occupy') {
    return 'Kavling Siap Huni';
  }
  
  return 'Properti';
};

// Hook untuk mengambil data properti dari Supabase
export const useProperties = (featured?: boolean, category?: string, limit?: number) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    
    try {
      console.log('Fetching properties with params:', { featured, category, limit });
      
      let query = supabase
        .from('properties')
        .select('*');
      
      // Filter berdasarkan featured jika parameter diberikan
      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }
      
      // Filter berdasarkan kategori jika parameter diberikan
      const dbCategory = mapUrlCategoryToDbCategory(category);
      if (dbCategory) {
        console.log('Filtering by category:', dbCategory);
        query = query.eq('category', dbCategory as any);
      }
      
      // Batasi hasil jika parameter limit diberikan
      if (limit) {
        query = query.limit(limit);
      }
      
      // Order by created_at descendingly to get newest properties first
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      console.log('Properties data fetched:', data);
      setProperties(data || []);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.message);
      setLoading(false);
      
      toast({
        title: "Gagal memuat data properti",
        description: "Terjadi kesalahan saat mengambil data dari server. Detail: " + err.message,
        variant: "destructive",
      });
    }
  }, [featured, category, limit, toast]);
  
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  const refetchProperties = useCallback(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  return { properties, loading, error, refetchProperties };
};

// Hook untuk mengambil detail properti berdasarkan ID atau slug/path
export const usePropertyDetail = (idOrSlug?: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchPropertyDetail = useCallback(async () => {
    if (!idOrSlug) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Fetching property detail for identifier:', idOrSlug);
      
      // Cek apakah identifier adalah UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      
      let query;
      
      if (isUuid) {
        // Jika UUID, cari berdasarkan ID
        query = supabase
          .from('properties')
          .select('*')
          .eq('id', idOrSlug)
          .maybeSingle();
      } else {
        // Konversi slug ke kategori database
        let category = null;
        
        if (idOrSlug === 'kavling-kosongan' || idOrSlug === 'empty_lot') {
          category = 'empty_lot';
        } else if (idOrSlug === 'kavling-setengah-jadi' || idOrSlug === 'semi_finished') {
          category = 'semi_finished';
        } else if (idOrSlug === 'kavling-siap-huni' || idOrSlug === 'ready_to_occupy') {
          category = 'ready_to_occupy';
        }
        
        if (category) {
          query = supabase
            .from('properties')
            .select('*')
            .eq('category', category)
            .limit(1)
            .maybeSingle();
        } else {
          // Coba cari berdasarkan title yang mirip dengan slug
          const searchTerm = idOrSlug.replace(/-/g, ' ');
          query = supabase
            .from('properties')
            .select('*')
            .ilike('title', `%${searchTerm}%`)
            .limit(1)
            .maybeSingle();
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      console.log('Property detail fetched:', data);
      setProperty(data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching property detail:', err);
      setError(err.message);
      setLoading(false);
      
      toast({
        title: "Gagal memuat detail properti",
        description: "Terjadi kesalahan saat mengambil data dari server. Detail: " + err.message,
        variant: "destructive",
      });
    }
  }, [idOrSlug, toast]);

  useEffect(() => {
    fetchPropertyDetail();
  }, [fetchPropertyDetail]);
  
  const refetchPropertyDetail = useCallback(() => {
    fetchPropertyDetail();
  }, [fetchPropertyDetail]);
  
  return { property, loading, error, refetchPropertyDetail };
};
