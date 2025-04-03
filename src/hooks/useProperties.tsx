
import { useState, useEffect, useCallback } from "react";
import { supabase, Property } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

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
      if (category && category !== 'all') {
        // Cast string ke tipe yang sesuai dengan kolom category di database
        query = query.eq('category', category as any);
      }
      
      // Batasi hasil jika parameter limit diberikan
      if (limit) {
        query = query.limit(limit);
      }
      
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
        // Jika bukan UUID, coba cari berdasarkan kategori
        // Asumsi kategori produk mengikuti format seperti: "empty_lot", "semi_finished", "ready_to_occupy"
        let category = null;
        
        if (idOrSlug === 'kavling-kosong' || idOrSlug === 'kavling-kosongan') {
          category = 'empty_lot';
        } else if (idOrSlug === 'kavling-setengah-jadi' || idOrSlug === 'semi-finished') {
          category = 'semi_finished';
        } else if (idOrSlug === 'siap-huni' || idOrSlug === 'kavling-siap-huni' || idOrSlug === 'ready-to-occupy') {
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
