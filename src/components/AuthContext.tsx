"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode, // Import ReactNode for children prop
} from "react";
import {
  User, // Import the Supabase User type
  AuthResponse,
  AuthError,
  UserAttributes
} from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
// --- IMPORTANT ---
// 1. Go to your Supabase project > Project Settings > API
// 2. Paste your Project URL and anon (public) key here.




// --- Define the shape of the context value ---
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean
  isAuthenticated: boolean;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<{ error: AuthError | null }>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  updateUser: (
    attributes: UserAttributes
  ) => Promise<AuthResponse>;
}

// --- Create the context ---
// We initialize it as null and will check for its existence in the hook
const AuthContext = createContext<AuthContextType | null>(null);

// --- Define the props for the provider ---
interface AuthProviderProps {
  children: ReactNode;
}

// --- Create the provider component ---
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
    setUser(currentUser); 
    setIsAdmin(currentUser?.user_metadata?.role === 'admin');
      setLoading(false);
    });            
   

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
    setUser(currentUser);
    setIsAdmin(currentUser?.user_metadata?.role === 'admin');
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email and password
  const signup = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: 'user' // Store extra data
        },
      },
    });
    if (error) throw error;
    return { data, error } as AuthResponse; // Return the full response
  };

  // Log in with email and password
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { data, error } as AuthResponse;
  };

  // Log in with Google
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
    // Note: The function will *not* return here, as the user is redirected.
  };

  // Log in with GitHub
  const loginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) throw error;
  };

  // Log out
  const logout = () => {
    return supabase.auth.signOut();
  };

  const updateUser = async (attributes: UserAttributes) => {
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) throw error;
    // Note: 'data.user' will be the updated user.
    // The onAuthStateChange listener will also fire and set the state.
    return { data, error } as AuthResponse;
  };

  const isAuthenticated = !!user;
  // The value to pass to consumers
  const value: AuthContextType = {
    user,
    loading,
    isAdmin,
    isAuthenticated,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithGithub,
    updateUser
  };

  // Return the provider
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// --- Create the custom hook ---
// This is what your pages will import
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // This check is important in TypeScript
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
