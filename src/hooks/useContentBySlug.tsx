
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface ContentData {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useContentBySlug = (slug: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      
      try {
        console.log(`Mengambil konten untuk slug: ${slug}`);
        
        const { data, error } = await supabase
          .from('contents')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          console.log(`Konten ditemukan:`, data);
          setContent(data as ContentData);
        } else {
          console.log(`Tidak ada konten untuk slug: ${slug}`);
          setContent(null);
        }
      } catch (err: any) {
        console.error('Error mengambil konten:', err);
        setError(err.message);
        
        toast({
          title: "Gagal memuat konten",
          description: "Terjadi kesalahan saat mengambil konten dari database",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [slug, toast]);
  
  return { content, loading, error };
};

export default useContentBySlug;
