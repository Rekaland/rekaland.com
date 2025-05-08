
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useAuthMethods = () => {
  const { toast } = useToast();

  // Clean up auth state for better reliability
  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
      
      // Clean up existing tokens first
      cleanupAuthState();
      
      // Attempt global sign out first to prevent auth conflicts
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log("Global sign out before login failed, continuing anyway");
      }
      
      // Sign in with email/password - explicit typing to avoid type errors
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error);
        
        if (error.message.includes("Email not confirmed")) {
          await supabase.auth.resend({
            type: 'signup',
            email: email
          });
          
          toast({
            title: "Email belum dikonfirmasi",
            description: "Kami telah mengirim ulang email konfirmasi. Silakan cek kotak masuk email Anda dan klik tautan konfirmasi.",
            variant: "destructive",
            duration: 6000,
          });
          
          return false;
        } else if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Email atau kata sandi salah",
            description: "Periksa kembali email dan kata sandi Anda, atau daftar jika Anda belum memiliki akun.",
            variant: "destructive",
            duration: 5000,
          });
        } else {
          toast({
            title: "Gagal masuk",
            description: error.message || "Terjadi kesalahan saat mencoba masuk",
            variant: "destructive",
            duration: 3000,
          });
        }
        
        return false;
      }

      console.log("Login successful:", data);

      // If email is one of our admin emails, ensure they have admin role
      if (email === 'rekaland.idn@gmail.com' || email === 'official.rbnsyaf@gmail.com') {
        console.log("Admin email detected, ensuring admin role is set");
        
        // Check if user already has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', data.user.id)
          .eq('role', 'admin');
          
        if (roleError) {
          console.error("Error checking admin role:", roleError);
        } else if (!roleData || roleData.length === 0) {
          // If admin role doesn't exist, add it
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: data.user.id, role: 'admin' }
            ]);
            
          if (insertError) {
            console.error("Error setting admin role:", insertError);
          } else {
            console.log("Admin role granted to", email);
          }
        } else {
          console.log("User already has admin role:", roleData);
        }
        
        // Also ensure profile has is_admin=true
        // First check if profile exists
        const { data: profileData, error: profileQueryError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id);
          
        if (profileQueryError) {
          console.error("Error checking profile:", profileQueryError);
        } else if (!profileData || profileData.length === 0) {
          // Create profile if it doesn't exist
          const { error: profileInsertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: email,
              full_name: data.user.user_metadata?.full_name || "Admin Rekaland",
              is_admin: true,
              updated_at: new Date().toISOString()
            });
            
          if (profileInsertError) {
            console.error("Error creating admin profile:", profileInsertError);
          }
        } else {
          // Update existing profile
          const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({
              is_admin: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', data.user.id);
            
          if (profileUpdateError) {
            console.error("Error updating profile admin status:", profileUpdateError);
          }
        }
      }

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
      
      // Clean up existing tokens first
      cleanupAuthState();
      
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
      
      // Clean up existing tokens first
      cleanupAuthState();
      
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

  const registerAdmin = async (email: string, password: string, name: string) => {
    try {
      console.log("Attempting registration for admin:", email);
      
      // Clean up existing tokens first
      cleanupAuthState();
      
      // Register new user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            is_admin: true,
          },
          emailRedirectTo: `${window.location.origin}/confirm-email`,
        }
      });

      if (error) {
        console.error("Admin registration error:", error);
        throw error;
      }

      console.log("Admin registration successful:", data);

      // Add admin role to user_roles table
      if (data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            { user_id: data.user.id, role: 'admin' }
          ]);
          
        if (roleError) {
          console.error("Error setting admin role:", roleError);
          throw roleError;
        }
        
        console.log("Admin role set successfully for user:", data.user.id);
      }

      toast({
        title: "Registrasi Admin Berhasil!",
        description: "Akun admin telah dibuat. Silakan cek email Anda untuk konfirmasi.",
        duration: 5000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });

      return true;
    } catch (error: any) {
      console.error("Admin registration failed:", error);
      
      toast({
        title: "Gagal mendaftar sebagai admin",
        description: error.message || "Terjadi kesalahan saat mencoba mendaftar",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const confirmEmail = async (token: string) => {
    try {
      console.log("Confirming email with token:", token);
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });
      
      if (error) {
        console.error("Email confirmation error:", error);
        throw error;
      }
      
      console.log("Email confirmation successful");
      
      toast({
        title: "Email berhasil dikonfirmasi",
        description: "Anda sekarang dapat login dengan akun Anda.",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none",
        duration: 3000,
      });
      
      return true;
    } catch (error: any) {
      console.error("Email confirmation failed:", error);
      
      toast({
        title: "Konfirmasi email gagal",
        description: error.message || "Terjadi kesalahan saat mencoba konfirmasi email",
        variant: "destructive",
        duration: 3000,
      });
      
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting logout");
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Try global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      console.log("Logout successful");
      
      toast({
        title: "Berhasil Keluar",
        description: "Anda telah keluar dari akun Anda",
        duration: 3000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });
      
      // Force page reload for a clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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
    registerAdmin,
    confirmEmail,
    logout
  };
};
