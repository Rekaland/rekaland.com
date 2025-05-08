
import { useState, useEffect, useCallback } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase, ExtendedUser } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

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

  const { toast } = useToast();

  // Clean up auth state for better reliability
  const cleanupAuthState = useCallback(() => {
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
  }, []);

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
            role: 'user', // Default role
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
          role: 'user', // Default role
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
  }, [toast]);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        
        // If no profile found, create one
        if (profileError.code === 'PGRST116' || !profile || profile.length === 0) {
          try {
            const { data: user } = await supabase.auth.getUser();
            if (user) {
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({
                  id: userId,
                  full_name: user.user?.user_metadata?.full_name || user.user?.user_metadata?.name,
                  email: user.user?.email
                })
                .select('*')
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
                  role: 'user', // Default role
                };

                return {
                  ...prevState,
                  user: updatedUser,
                  profile: newProfile,
                };
              });
              
              // After creating profile, check admin status
              checkAdminStatus(userId);
              return;
            }
          } catch (err) {
            console.error("Error creating profile:", err);
          }
        } else {
          throw profileError;
        }
      } else if (profile && profile.length > 0) {
        console.log("User profile data:", profile[0]);
        
        // Update state with profile data
        setAuthState(prevState => {
          const updatedUser: ExtendedUser = {
            ...(prevState.user || { id: userId }),
            name: profile[0]?.full_name || '',
            avatar: profile[0]?.avatar_url || '',
            role: 'user', // Default role
          };

          return {
            ...prevState,
            user: updatedUser,
            profile: profile[0],
          };
        });
        
        // Check admin status
        checkAdminStatus(userId);
      } else {
        console.log("No profile found, will create one");
        // Create a new profile
        try {
          const { data: user } = await supabase.auth.getUser();
          if (user && user.user) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                id: userId,
                full_name: user.user?.user_metadata?.full_name || user.user?.user_metadata?.name || 'User',
                email: user.user?.email
              })
              .select('*')
              .single();
              
            if (createError) {
              throw createError;
            }
            
            console.log("Created new profile:", newProfile);
            
            // Check admin status after creating profile
            checkAdminStatus(userId);
          }
        } catch (err) {
          console.error("Error creating profile:", err);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user:", userId);
      
      // Check if user email is admin email, always make them admin
      const { data: userData } = await supabase.auth.getUser();
      
      if (userData && userData.user) {
        console.log("Current user email:", userData.user.email);
        
        const adminEmails = ['rekaland.idn@gmail.com', 'official.rbnsyaf@gmail.com'];
        const userEmail = userData.user.email || '';
        
        // Check if email is admin email
        if (adminEmails.includes(userEmail)) {
          console.log(`User email ${userEmail} matches admin email, setting admin status directly`);
          
          // Ensure user has admin role in user_roles table
          const { data: existingRole, error: roleCheckError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', userId)
            .eq('role', 'admin');
            
          if (roleCheckError) {
            console.error("Error checking existing admin role:", roleCheckError);
          } else if (!existingRole || existingRole.length === 0) {
            // Insert admin role if not exists
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert({
                user_id: userId,
                role: 'admin'
              });
                
            if (insertError) {
              console.error("Error inserting admin role:", insertError);
            } else {
              console.log("Added admin role for user:", userId);
            }
          } else {
            console.log("User already has admin role in database");
          }
          
          // Update profile is_admin flag
          const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', userId);
            
          if (profileUpdateError) {
            console.error("Error updating profile is_admin flag:", profileUpdateError);
          }
          
          // Set admin status in state
          setAuthState(prevState => {
            const updatedUser = prevState.user ? {
              ...prevState.user,
              role: 'admin',
            } : null;
            
            return {
              ...prevState,
              isAdmin: true,
              user: updatedUser,
            };
          });
          
          return;
        }
      }
      
      // For other users, check admin status in user_roles table
      console.log("Checking admin role in user_roles table");
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin');
      
      console.log("Admin role check result:", roleData, roleError);

      if (roleError) {
        console.error("Error checking admin role:", roleError);
      } else if (roleData && roleData.length > 0) {
        console.log("User has admin role in database");
        
        // Set admin state to true and update user role
        setAuthState(prevState => {
          const updatedUser = prevState.user ? {
            ...prevState.user,
            role: 'admin',
          } : null;
          
          return {
            ...prevState,
            isAdmin: true,
            user: updatedUser,
          };
        });
        
        // Ensure profile has is_admin flag set
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', userId);
          
        if (profileUpdateError) {
          console.error("Error updating profile is_admin flag:", profileUpdateError);
        }
      } else {
        console.log("User is not an admin");
        
        // Double-check by email as fallback
        const { data: userData } = await supabase.auth.getUser();
        if (userData && userData.user && userData.user.email) {
          const adminEmails = ['rekaland.idn@gmail.com', 'official.rbnsyaf@gmail.com'];
          if (adminEmails.includes(userData.user.email)) {
            console.log("User email is admin but no admin role found, adding it");
            
            // Add admin role
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert({
                user_id: userId,
                role: 'admin'
              });
                
            if (insertError) {
              console.error("Error inserting admin role:", insertError);
            } else {
              console.log("Added admin role for email:", userData.user.email);
              
              // Update state
              setAuthState(prevState => {
                const updatedUser = prevState.user ? {
                  ...prevState.user,
                  role: 'admin',
                } : null;
                
                return {
                  ...prevState,
                  isAdmin: true,
                  user: updatedUser,
                };
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  return {
    ...authState,
    fetchUserProfile
  };
};
