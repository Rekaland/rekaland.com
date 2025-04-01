
import { useState, useEffect } from "react";
import { supabase, Property } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

// Hook untuk mengambil data properti dari Supabase
export const useProperties = (featured?: boolean, category?: string, limit?: number) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperties = async () => {
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
      } catch (err: any) {
        console.error('Error fetching properties:', err);
        setError(err.message);
        
        toast({
          title: "Gagal memuat data properti",
          description: "Terjadi kesalahan saat mengambil data dari server. Detail: " + err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [featured, category, limit, toast]);
  
  return { properties, loading, error };
};

// Hook untuk mengambil detail properti berdasarkan ID
export const usePropertyDetail = (id?: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    const fetchPropertyDetail = async () => {
      setLoading(true);
      
      try {
        console.log('Fetching property detail for ID:', id);
        
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        console.log('Property detail fetched:', data);
        setProperty(data);
      } catch (err: any) {
        console.error('Error fetching property detail:', err);
        setError(err.message);
        
        toast({
          title: "Gagal memuat detail properti",
          description: "Terjadi kesalahan saat mengambil data dari server. Detail: " + err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyDetail();
  }, [id, toast]);
  
  return { property, loading, error };
};
