
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { Testimonial } from '@/integrations/supabase/client';
import { supabase } from '@/integrations/supabase/client';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Since there's no testimonials table yet in the database schema,
      // we'll use mock data for now
      const mockTestimonials: Testimonial[] = [
        {
          id: '1',
          name: 'Budi Santoso',
          testimonial: 'Saya sangat puas dengan layanan RekaLand. Proses pembelian kavling sangat mudah dan transparan.',
          rating: 5,
          position: 'Pengusaha',
          company: 'PT. Maju Bersama',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Siti Rahayu',
          testimonial: 'RekaLand memberikan solusi investasi properti yang terjangkau. Saya sudah membeli 2 kavling dan sangat menguntungkan.',
          rating: 4,
          position: 'Dokter',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Ahmad Fadli',
          testimonial: 'Tim RekaLand sangat profesional dan membantu saya memilih lokasi strategis sesuai budget.',
          rating: 5,
          position: 'Dosen',
          company: 'Universitas Indonesia',
          created_at: new Date().toISOString(),
        }
      ];
      
      setTestimonials(mockTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Gagal memuat testimonial');
      
      toast({
        title: 'Error',
        description: 'Gagal memuat testimonial',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addTestimonial = async (newTestimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
    setError(null);
    
    try {
      // This is a placeholder for when we have a testimonials table
      // const { data, error } = await supabase
      //   .from('testimonials')
      //   .insert({
      //     name: newTestimonial.name,
      //     testimonial: newTestimonial.testimonial,
      //     rating: newTestimonial.rating,
      //     position: newTestimonial.position,
      //     company: newTestimonial.company
      //   })
      //   .select();
      
      // if (error) throw error;
      
      // Mock adding testimonial
      const mockNewTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...newTestimonial,
        created_at: new Date().toISOString()
      };
      
      // Update local state
      setTestimonials(prev => [...prev, mockNewTestimonial]);
      
      toast({
        title: 'Berhasil',
        description: 'Testimonial berhasil ditambahkan',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return mockNewTestimonial;
    } catch (err) {
      console.error('Error adding testimonial:', err);
      setError('Gagal menambahkan testimonial');
      
      toast({
        title: 'Error',
        description: 'Gagal menambahkan testimonial',
        variant: 'destructive',
      });
      
      return null;
    }
  };
  
  const deleteTestimonial = async (id: string) => {
    setError(null);
    
    try {
      // This is a placeholder for when we have a testimonials table
      // const { error } = await supabase
      //   .from('testimonials')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // Update local state
      setTestimonials(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: 'Berhasil',
        description: 'Testimonial berhasil dihapus',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      setError('Gagal menghapus testimonial');
      
      toast({
        title: 'Error',
        description: 'Gagal menghapus testimonial',
        variant: 'destructive',
      });
      
      return false;
    }
  };
  
  useEffect(() => {
    fetchTestimonials();
  }, []);
  
  return {
    testimonials,
    isLoading,
    error,
    fetchTestimonials,
    addTestimonial,
    deleteTestimonial
  };
};
