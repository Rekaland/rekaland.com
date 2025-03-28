
import { useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
}

export function useAuth() {
  // This is a simplified mock implementation
  // In a real app, this would check tokens, session cookies, etc.
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  });

  const login = (email: string, password: string) => {
    // Simplified mock login
    // In a real app, this would make an API request
    if (email === "gueadmin" && password === "gueadmin") {
      setAuthState({
        isAuthenticated: true,
        isAdmin: true,
        user: {
          name: "Admin User",
          email: "gueadmin",
          role: "admin"
        },
      });
      return true;
    } else if (email && password) {
      setAuthState({
        isAuthenticated: true,
        isAdmin: false,
        user: {
          name: "Regular User",
          email,
          role: "user"
        },
      });
      return true;
    }
    return false;
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
    logout,
  };
}
