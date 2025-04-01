
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Content {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export const useContents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadContents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setContents(data);
      }
    } catch (err: any) {
      console.error('Error loading contents:', err);
      setError(err.message);
      
      toast({
        title: "Gagal memuat konten",
        description: "Terjadi kesalahan saat mengambil data dari server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  const saveContent = async (content: Content) => {
    try {
      let result;
      
      if (content.id) {
        // Update existing content
        result = await supabase
          .from('contents')
          .update({
            title: content.title,
            slug: content.slug,
            content: content.content,
            meta_description: content.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.id);
      } else {
        // Create new content
        result = await supabase
          .from('contents')
          .insert({
            title: content.title,
            slug: content.slug,
            content: content.content,
            meta_description: content.meta_description
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Reload contents after change
      await loadContents();
      
      return { success: true };
    } catch (err: any) {
      console.error('Error saving content:', err);
      
      toast({
        title: "Gagal menyimpan konten",
        description: err.message || "Terjadi kesalahan saat menyimpan ke database",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Reload contents after deletion
      await loadContents();
      
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting content:', err);
      
      toast({
        title: "Gagal menghapus konten",
        description: err.message || "Terjadi kesalahan saat menghapus dari database",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  return { 
    contents, 
    loading, 
    error, 
    loadContents,
    saveContent,
    deleteContent
  };
};

// Hook untuk mengambil konten berdasarkan slug
export const useContentBySlug = (slug?: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    
    const fetchContent = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('contents')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setContent(data);
        } else {
          setContent(null);
        }
      } catch (err: any) {
        console.error('Error fetching content:', err);
        setError(err.message);
        
        toast({
          title: "Gagal memuat konten",
          description: "Terjadi kesalahan saat mengambil data dari server.",
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
