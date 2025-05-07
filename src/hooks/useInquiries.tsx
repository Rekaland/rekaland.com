
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { Inquiry } from '@/integrations/supabase/client';
import { supabase } from '@/integrations/supabase/client';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setInquiries(data as Inquiry[]);
    } catch (err: any) {
      console.error('Error fetching inquiries:', err);
      setError(err.message || 'Gagal memuat data inquiry');
      
      toast({
        title: 'Error',
        description: 'Gagal memuat data inquiry',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          ...inquiry,
          status: 'new'
        }])
        .select();
        
      if (error) throw error;
      
      setInquiries(prev => [data[0] as Inquiry, ...prev]);
      
      toast({
        title: 'Berhasil',
        description: 'Inquiry berhasil dikirim',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return data[0] as Inquiry;
    } catch (err: any) {
      console.error('Error adding inquiry:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal mengirim inquiry',
        variant: 'destructive',
      });
      
      return null;
    }
  };
  
  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } as Inquiry : inq));
      
      toast({
        title: 'Berhasil',
        description: 'Status inquiry berhasil diperbarui',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return data[0] as Inquiry;
    } catch (err: any) {
      console.error('Error updating inquiry status:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal memperbarui status inquiry',
        variant: 'destructive',
      });
      
      return null;
    }
  };
  
  const deleteInquiry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      
      toast({
        title: 'Berhasil',
        description: 'Inquiry berhasil dihapus',
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
      
      return true;
    } catch (err: any) {
      console.error('Error deleting inquiry:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Gagal menghapus inquiry',
        variant: 'destructive',
      });
      
      return false;
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);
  
  return {
    inquiries,
    isLoading,
    error,
    fetchInquiries,
    addInquiry,
    updateInquiryStatus,
    deleteInquiry
  };
};
