
import { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuthMethods = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error.message);
        setError(error.message);
        toast.error('Login gagal: ' + error.message);
        return null;
      }

      console.log('Login berhasil:', data);
      toast.success('Login berhasil!');
      navigate('/admin');
      return data;
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
        toast.error('Logout gagal: ' + error.message);
        return false;
      }
      toast.success('Berhasil logout');
      navigate('/');
      return true;
    } catch (err) {
      console.error('Unexpected logout error:', err);
      toast.error('Terjadi kesalahan saat logout. Silakan coba lagi.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Signup error:', error.message);
        setError(error.message);
        toast.error('Pendaftaran gagal: ' + error.message);
        return null;
      }

      toast.success('Pendaftaran berhasil! Silakan verifikasi email Anda.');
      return data;
    } catch (err) {
      console.error('Unexpected signup error:', err);
      setError('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
      toast.error('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signOut,
    signUp,
    loading,
    error
  };
};
