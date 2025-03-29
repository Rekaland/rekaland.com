
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, ExtendedUser } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: ExtendedUser | null;
  profile: any | null;
  session: Session | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    profile: null,
    session: null
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // Create extended user with basic info
          const extendedUser: ExtendedUser = {
            id: session.user.id,
            email: session.user.email,
          };

          setAuthState(prevState => ({
            ...prevState,
            isAuthenticated: true,
            user: extendedUser,
            session: session,
          }));

          // Fetch profile and role in a separate non-blocking operation
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setAuthState({
            isAuthenticated: false,
            isAdmin: false,
            user: null,
            profile: null,
            session: null
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Create extended user with basic info
        const extendedUser: ExtendedUser = {
          id: session.user.id,
          email: session.user.email,
        };

        setAuthState(prevState => ({
          ...prevState,
          isAuthenticated: true,
          user: extendedUser,
          session: session,
        }));

        // Fetch profile and role in a separate non-blocking operation
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Ambil profil pengguna
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Cek apakah pengguna adalah admin
      const { data: isAdminData, error: isAdminError } = await supabase
        .rpc('is_admin', { user_id: userId });

      if (isAdminError) throw isAdminError;

      // Update user with profile data
      setAuthState(prevState => {
        const updatedUser: ExtendedUser = {
          ...(prevState.user || { id: userId }),
          name: profile?.full_name || '',
          avatar: profile?.avatar_url || '',
          role: isAdminData ? 'admin' : 'user'
        };

        return {
          ...prevState,
          user: updatedUser,
          profile,
          isAdmin: !!isAdminData,
        };
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast({
        title: "Selamat datang kembali!",
        description: "Anda berhasil masuk.",
        duration: 1000,
        className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none",
      });

      return true;
    } catch (error: any) {
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      return true;
    } catch (error: any) {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        }
      });

      if (error) throw error;

      toast({
        title: "Registrasi Berhasil!",
        description: "Selamat datang di Rekaland.",
        duration: 1000,
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });

      return true;
    } catch (error: any) {
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
      await supabase.auth.signOut();
      
      toast({
        title: "Berhasil Keluar",
        description: "Anda telah keluar dari akun Anda",
        duration: 1000,
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

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
