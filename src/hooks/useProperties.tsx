
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setProperties(data as Property[]);
      
      // Filter featured properties
      const featured = data.filter((prop: any) => prop.featured) as Property[];
      setFeaturedProperties(featured);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Gagal memuat data properti');
      
      toast({
        title: 'Error',
        description: 'Gagal memuat data properti',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchPropertyById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data as Property;
    } catch (err: any) {
      console.error(`Error fetching property with id ${id}:`, err);
      setError(err.message || 'Gagal memuat detail properti');
      
      toast({
        title: 'Error',
        description: 'Gagal memuat detail properti',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addProperty = async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select();
        
      if (error) throw error;
      
      setProperties(prev => [data[0] as Property, ...prev]);
      
      toast({
        title: 'Berhasil',
        description: 'Properti baru berhasil ditambahkan',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return data[0] as Property;
    } catch (err: any) {
      console.error('Error adding property:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal menambahkan properti baru',
        variant: 'destructive',
      });
      
      return null;
    }
  };
  
  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...data[0] } as Property : p));
      
      toast({
        title: 'Berhasil',
        description: 'Properti berhasil diperbarui',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return data[0] as Property;
    } catch (err: any) {
      console.error('Error updating property:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal memperbarui properti',
        variant: 'destructive',
      });
      
      return null;
    }
  };
  
  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setProperties(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: 'Berhasil',
        description: 'Properti berhasil dihapus',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return true;
    } catch (err: any) {
      console.error('Error deleting property:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal menghapus properti',
        variant: 'destructive',
      });
      
      return false;
    }
  };
  
  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update({
          featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      setProperties(prev => prev.map(p => p.id === id ? { ...p, featured } as Property : p));
      
      // Update featured properties
      if (featured) {
        const property = properties.find(p => p.id === id);
        if (property) {
          setFeaturedProperties(prev => [...prev, { ...property, featured: true }]);
        }
      } else {
        setFeaturedProperties(prev => prev.filter(p => p.id !== id));
      }
      
      toast({
        title: 'Berhasil',
        description: featured ? 'Properti ditandai sebagai unggulan' : 'Properti tidak lagi unggulan',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return data[0] as Property;
    } catch (err: any) {
      console.error('Error toggling featured status:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal mengubah status unggulan properti',
        variant: 'destructive',
      });
      
      return null;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  
  return {
    properties,
    featuredProperties,
    isLoading,
    error,
    fetchProperties,
    fetchPropertyById,
    addProperty,
    updateProperty,
    deleteProperty,
    toggleFeatured
  };
};
