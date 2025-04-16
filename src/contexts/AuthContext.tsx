
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  signUp,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
  checkIfAdmin
} from "./auth/authActions";

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider initialized");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          setTimeout(() => {
            handleAdminCheck(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Got existing session:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        handleAdminCheck(session.user.id);
      } else {
        console.log("No session found during initialization");
      }
      
      setLoading(false);
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminCheck = async (userId: string) => {
    console.log("Checking if user is admin:", userId);
    const isUserAdmin = await checkIfAdmin(userId);
    console.log("Admin check result:", isUserAdmin);
    setIsAdmin(isUserAdmin);
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    console.log("Handling sign up for:", email);
    return signUp(email, password, fullName, { toast, navigate });
  };

  const handleSignIn = async (email: string, password: string) => {
    console.log("Handling sign in for:", email);
    return signIn(email, password, { toast, navigate });
  };

  const handleSignOut = async () => {
    console.log("Handling sign out");
    return signOut({ toast, navigate });
  };

  const handleResetPassword = async (email: string) => {
    console.log("Handling password reset for:", email);
    return resetPassword(email, { toast });
  };

  const handleUpdatePassword = async (newPassword: string) => {
    console.log("Handling password update");
    return updatePassword(newPassword, { toast, navigate });
  };

  const value = {
    user,
    session,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
