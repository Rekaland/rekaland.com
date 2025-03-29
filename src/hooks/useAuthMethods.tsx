
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useAuthMethods = () => {
  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      console.log("Login successful:", data);

      toast({
        title: "Selamat datang kembali!",
        description: "Anda berhasil masuk.",
        duration: 3000,
        className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none",
      });

      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      
      toast({
        title: "Gagal masuk",
        description: error.message || "Terjadi kesalahan saat mencoba masuk",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Attempting login with Google");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error("Google login error:", error);
        throw error;
      }
      
      console.log("Google login initiated:", data);
      
      return true;
    } catch (error: any) {
      console.error("Google login failed:", error);
      
      toast({
        title: "Gagal masuk dengan Google",
        description: error.message || "Terjadi kesalahan saat mencoba masuk dengan Google",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log("Attempting registration for:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        }
      });

      if (error) {
        console.error("Registration error:", error);
        throw error;
      }

      console.log("Registration successful:", data);

      toast({
        title: "Registrasi Berhasil!",
        description: "Selamat datang di Rekaland.",
        duration: 3000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });

      return true;
    } catch (error: any) {
      console.error("Registration failed:", error);
      
      toast({
        title: "Gagal mendaftar",
        description: error.message || "Terjadi kesalahan saat mencoba mendaftar",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting logout");
      
      await supabase.auth.signOut();
      
      console.log("Logout successful");
      
      toast({
        title: "Berhasil Keluar",
        description: "Anda telah keluar dari akun Anda",
        duration: 3000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast({
        title: "Gagal keluar",
        description: error.message || "Terjadi kesalahan saat mencoba keluar",
        variant: "destructive",
      });
    }
  };

  return {
    login,
    loginWithGoogle,
    register,
    logout
  };
};
