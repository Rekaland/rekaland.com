
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  loginWithGoogle: () => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth 
      ? JSON.parse(savedAuth) 
      : {
          isAuthenticated: false,
          isAdmin: false,
          user: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(authState));
  }, [authState]);

  const login = (email: string, password: string) => {
    // Simplified mock login
    if (email === "gueadmin" && password === "gueadmin") {
      const newState = {
        isAuthenticated: true,
        isAdmin: true,
        user: {
          name: "Admin User",
          email: "gueadmin",
          role: "admin",
          avatar: "https://i.pravatar.cc/150?u=admin",
        },
      };
      setAuthState(newState);
      toast({
        title: "Selamat Datang Admin!",
        description: "Anda berhasil masuk sebagai admin.",
      });
      return true;
    } else if (email && password) {
      const newState = {
        isAuthenticated: true,
        isAdmin: false,
        user: {
          name: "Regular User",
          email,
          role: "user",
          avatar: `https://i.pravatar.cc/150?u=${email}`,
        },
      };
      setAuthState(newState);
      toast({
        title: "Selamat Datang!",
        description: "Anda berhasil masuk.",
      });
      return true;
    }
    return false;
  };

  const loginWithGoogle = () => {
    // Mock Google login
    const randomEmail = `user${Math.floor(Math.random() * 1000)}@gmail.com`;
    const newState = {
      isAuthenticated: true,
      isAdmin: false,
      user: {
        name: "Google User",
        email: randomEmail,
        role: "user",
        avatar: `https://i.pravatar.cc/150?u=${randomEmail}`,
      },
    };
    setAuthState(newState);
    toast({
      title: "Selamat Datang!",
      description: "Anda berhasil masuk dengan Google.",
    });
    return true;
  };

  const register = (name: string, email: string, password: string) => {
    // Mock registration
    const newState = {
      isAuthenticated: true,
      isAdmin: false,
      user: {
        name,
        email,
        role: "user",
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      },
    };
    setAuthState(newState);
    toast({
      title: "Registrasi Berhasil!",
      description: "Selamat datang di Rekaland.",
    });
    return true;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    });
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun.",
    });
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
