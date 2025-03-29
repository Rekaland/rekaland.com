
import { createContext, useContext, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { ExtendedUser } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "./useSupabaseAuth";
import { useAuthMethods } from "./useAuthMethods";

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
  const authState = useSupabaseAuth();
  const authMethods = useAuthMethods();

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        ...authMethods,
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
