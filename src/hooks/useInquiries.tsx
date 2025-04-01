
import { useState, useEffect } from 'react';
import { supabase, Inquiry } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useRealTimeSync } from './useRealTimeSync';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadInquiries = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('inquiries')
        .select('*, properties(title)')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setInquiries(data);
      }
    } catch (err: any) {
      console.error('Error loading inquiries:', err);
      setError(err.message);
      
      toast({
        title: "Gagal memuat inquiry",
        description: "Terjadi kesalahan saat mengambil data dari server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Setup real-time sync
  const { isSubscribed } = useRealTimeSync('inquiries', loadInquiries);

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Reload inquiries after update
      await loadInquiries();
      
      toast({
        title: "Status diperbarui",
        description: `Status inquiry berhasil diubah menjadi "${status}"`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      });
      
      return { success: true };
    } catch (err: any) {
      console.error('Error updating inquiry status:', err);
      
      toast({
        title: "Gagal memperbarui status",
        description: err.message || "Terjadi kesalahan saat memperbarui status",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Reload inquiries after deletion
      await loadInquiries();
      
      toast({
        title: "Inquiry dihapus",
        description: "Inquiry berhasil dihapus dari database",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      });
      
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting inquiry:', err);
      
      toast({
        title: "Gagal menghapus inquiry",
        description: err.message || "Terjadi kesalahan saat menghapus inquiry",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    }
  };

  return { 
    inquiries, 
    loading, 
    error, 
    isRealTimeActive: isSubscribed,
    loadInquiries,
    updateInquiryStatus,
    deleteInquiry
  };
};

// Hook untuk membuat inquiry baru
export const useCreateInquiry = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createInquiry = async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          message: inquiry.message,
          property_id: inquiry.property_id,
          user_id: inquiry.user_id
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      });
      
      return { success: true };
    } catch (err: any) {
      console.error('Error creating inquiry:', err);
      
      toast({
        title: "Gagal mengirim pesan",
        description: err.message || "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
      
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { 
    createInquiry, 
    loading 
  };
};
