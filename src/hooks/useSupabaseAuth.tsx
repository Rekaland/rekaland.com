
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, ExtendedUser } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useSupabaseAuth = () => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: ExtendedUser | null;
    profile: any | null;
    session: Session | null;
  }>({
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

  return {
    ...authState,
    fetchUserProfile
  };
};
