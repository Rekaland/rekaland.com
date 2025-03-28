
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  } | null;
}

export function useAuth() {
  // This is a simplified mock implementation
  // In a real app, this would check tokens, session cookies, etc.
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {
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
    // In a real app, this would make an API request
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
    // Mock Google login (in a real app, this would use OAuth)
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
    // Mock registration (in a real app, this would make an API request)
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
  };

  return {
    ...authState,
    login,
    loginWithGoogle,
    register,
    logout,
  };
}
