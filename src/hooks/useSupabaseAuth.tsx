
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase, ExtendedUser } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useSupabaseAuth = () => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: ExtendedUser | null;
    profile: any | null;
    session: Session | null;
    isLoading: boolean;
  }>({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    profile: null,
    session: null,
    isLoading: true
  });

  useEffect(() => {
    console.log("Initializing Supabase auth...");

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        
        if (session) {
          console.log("Session user:", session.user);
          
          // Create extended user with basic info
          const extendedUser: ExtendedUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user?.user_metadata?.full_name || session.user?.user_metadata?.name,
          };

          setAuthState(prevState => ({
            ...prevState,
            isAuthenticated: true,
            user: extendedUser,
            session: session,
            isLoading: false
          }));

          // Fetch profile and role in a separate non-blocking operation
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
          
          // Log success
          if (event === 'SIGNED_IN') {
            toast({
              title: "Login berhasil!",
              description: `Selamat datang${extendedUser.name ? ', ' + extendedUser.name : ''}!`,
              className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
            });
          }
        } else {
          console.log("No session available after auth change event:", event);
          
          setAuthState({
            isAuthenticated: false,
            isAdmin: false,
            user: null,
            profile: null,
            session: null,
            isLoading: false
          });
          
          // Log sign out
          if (event === 'SIGNED_OUT') {
            toast({
              title: "Logout berhasil",
              description: "Anda telah keluar dari akun",
              className: "bg-gray-700 text-white",
            });
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Checking for existing session:", session ? "Found" : "Not found");
      
      if (session) {
        // Create extended user with basic info
        const extendedUser: ExtendedUser = {
          id: session.user.id,
          email: session.user.email,
          name: session.user?.user_metadata?.full_name || session.user?.user_metadata?.name,
        };

        setAuthState(prevState => ({
          ...prevState,
          isAuthenticated: true,
          user: extendedUser,
          session: session,
          isLoading: false
        }));

        // Fetch profile and role in a separate non-blocking operation
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      } else {
        setAuthState(prevState => ({
          ...prevState,
          isLoading: false
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Ambil profil pengguna
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        
        // Jika error adalah 'record not found', coba buat profil baru
        if (profileError.code === 'PGRST116') {
          try {
            const { data: user } = await supabase.auth.getUser();
            if (user) {
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert([
                  { 
                    id: userId,
                    full_name: user.user?.user_metadata?.full_name || user.user?.user_metadata?.name
                  }
                ])
                .select()
                .single();
                
              if (createError) {
                throw createError;
              }
              
              console.log("Created new profile:", newProfile);
              
              // Update state with new profile
              setAuthState(prevState => {
                const updatedUser: ExtendedUser = {
                  ...(prevState.user || { id: userId }),
                  name: newProfile?.full_name || '',
                  avatar: newProfile?.avatar_url || '',
                };

                return {
                  ...prevState,
                  user: updatedUser,
                  profile: newProfile,
                };
              });
              
              // Setelah membuat profil, lanjutkan untuk memeriksa status admin
              checkAdminStatus(userId);
              return;
            }
          } catch (err) {
            console.error("Error creating profile:", err);
          }
        } else {
          throw profileError;
        }
      } else {
        console.log("User profile data:", profile);
        
        // Update state with profile data
        setAuthState(prevState => {
          const updatedUser: ExtendedUser = {
            ...(prevState.user || { id: userId }),
            name: profile?.full_name || '',
            avatar: profile?.avatar_url || '',
          };

          return {
            ...prevState,
            user: updatedUser,
            profile,
          };
        });
        
        // Periksa status admin
        checkAdminStatus(userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user:", userId);
      
      // Cek email pengguna, jika rekaland.idn@gmail.com, pastikan sebagai admin
      const { data: userData } = await supabase.auth.getUser();
      if (userData && userData.user && userData.user.email === 'rekaland.idn@gmail.com') {
        console.log("User is rekaland.idn@gmail.com, checking/setting admin role");
        
        // Periksa apakah sudah ada di user_roles
        const { data: roleData, error: roleCheckError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .eq('role', 'admin');
          
        if (roleCheckError) {
          console.error("Error checking admin role:", roleCheckError);
        } else if (!roleData || roleData.length === 0) {
          // Tambahkan peran admin jika belum ada
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: userId, role: 'admin' }
            ]);
            
          if (insertError) {
            console.error("Error setting admin role:", insertError);
          } else {
            console.log("Admin role granted to rekaland.idn@gmail.com");
            
            // Set admin state to true
            setAuthState(prevState => ({
              ...prevState,
              isAdmin: true,
            }));
            
            return;
          }
        } else {
          console.log("User already has admin role");
          
          // Set admin state to true
          setAuthState(prevState => ({
            ...prevState,
            isAdmin: true,
          }));
          
          return;
        }
      }
      
      // For other users, check admin status using RPC
      const { data: isAdminData, error: isAdminError } = await supabase
        .rpc('is_admin', { user_id: userId });

      if (isAdminError) {
        console.error("Error checking admin status:", isAdminError);
        throw isAdminError;
      }
      
      console.log("Is user admin:", isAdminData);
      
      // Update state with admin status
      setAuthState(prevState => ({
        ...prevState,
        isAdmin: !!isAdminData,
      }));
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  return {
    ...authState,
    fetchUserProfile
  };
};
