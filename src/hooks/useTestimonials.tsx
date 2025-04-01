
import { useState, useEffect } from 'react';
import { supabase, Testimonial } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setTestimonials(data);
      }
    } catch (err: any) {
      console.error('Error loading testimonials:', err);
      setError(err.message);
      
      toast({
        title: "Gagal memuat testimonial",
        description: "Terjadi kesalahan saat mengambil data dari server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const saveTestimonial = async (testimonial: Partial<Testimonial>) => {
    try {
      let result;
      
      if (testimonial.id) {
        // Update existing testimonial
        result = await supabase
          .from('testimonials')
          .update({
            name: testimonial.name,
            testimonial: testimonial.testimonial,
            rating: testimonial.rating,
            position: testimonial.position,
            company: testimonial.company,
            avatar_url: testimonial.avatar_url
          })
          .eq('id', testimonial.id);
      } else {
        // Create new testimonial
        result = await supabase
          .from('testimonials')
          .insert({
            name: testimonial.name!,
            testimonial: testimonial.testimonial!,
            rating: testimonial.rating || 5,
            position: testimonial.position,
            company: testimonial.company,
            avatar_url: testimonial.avatar_url
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Reload testimonials after change
      await loadTestimonials();
      
      return { success: true };
    } catch (err: any) {
      console.error('Error saving testimonial:', err);
      
      toast({
        title: "Gagal menyimpan testimonial",
        description: err.message || "Terjadi kesalahan saat menyimpan ke database",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Reload testimonials after deletion
      await loadTestimonials();
      
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting testimonial:', err);
      
      toast({
        title: "Gagal menghapus testimonial",
        description: err.message || "Terjadi kesalahan saat menghapus dari database",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  return { 
    testimonials, 
    loading, 
    error, 
    loadTestimonials,
    saveTestimonial,
    deleteTestimonial
  };
};
