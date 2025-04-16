
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

// Development mode flag - set to false for production
const DEVELOPMENT_MODE = false;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { user, signIn, loading, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect to appropriate dashboard if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, isAdmin, navigate]);

  const handleDevModeLogin = () => {
    toast({
      title: "Development Mode",
      description: "Bypassing authentication and navigating to dashboard.",
    });
    
    // Navigate to the dashboard instead of admin/dashboard
    navigate("/dashboard");
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (DEVELOPMENT_MODE) {
        handleDevModeLogin();
        return;
      }
      
      // Normal authentication flow (used in production mode)
      await signIn(data.email, data.password);
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we have a real authenticated user, redirect to the appropriate dashboard
  if (user) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-unicorn-darkPurple/90">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="relative mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
          {/* Background glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-unicorn-gold/10 blur-xl"></div>
          
          <div className="relative p-8 bg-unicorn-darkPurple/90 rounded-xl border border-unicorn-gold/30 shadow-2xl">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <img
                  src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png"
                  alt="UnicornEnergies Logo"
                  className="mx-auto h-16 w-16"
                />
              </Link>
              <h1 className="mt-4 text-2xl font-bold text-white">Sign in to your account</h1>
              <p className="mt-2 text-gray-400">
                Welcome back! Please enter your credentials to continue.
              </p>
              {DEVELOPMENT_MODE && (
                <div className="mt-2 text-green-400 border border-green-400 p-2 rounded-md">
                  Development Mode: Authentication bypass enabled
                </div>
              )}
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white">Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-unicorn-gold hover:text-unicorn-gold/80"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Development mode buttons, only shown in dev mode */}
                {DEVELOPMENT_MODE ? (
                  <div className="space-y-4">
                    <Button 
                      type="button"
                      onClick={handleDevModeLogin}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
                    >
                      Dev Mode Login (Skip Authentication)
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => navigate("/admin/dashboard")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                    >
                      Dev Mode Admin Login
                    </Button>
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold"
                  disabled={isSubmitting || loading}
                >
                  {(isSubmitting || loading) ? (
                    <div className="h-5 w-5 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Sign in
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-unicorn-gold hover:text-unicorn-gold/80 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
