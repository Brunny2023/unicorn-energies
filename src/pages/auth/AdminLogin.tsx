
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
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

  // Check authentication and admin status
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin/dashboard");
    } else if (user && !isAdmin) {
      // If logged in but not admin, show access denied
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Your account does not have administrator privileges.",
      });
    }
  }, [user, isAdmin, navigate, toast]);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Try to sign in - regular auth flow
      await signIn(data.email, data.password);
      
      // Navigate will happen in the useEffect if the user is an admin
    } catch (error) {
      console.error("Error during admin login:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials or you don't have admin privileges.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we have a real authenticated admin user, redirect to admin dashboard
  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" />;
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
              <div className="flex items-center justify-center mt-4">
                <Shield className="h-5 w-5 text-unicorn-gold mr-2" />
                <h1 className="text-2xl font-bold text-white">Administrator Login</h1>
              </div>
              <p className="mt-2 text-gray-400">
                Secure access for administration staff only
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Admin Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@unicorn-energies.com"
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
                      <FormLabel className="text-white">Password</FormLabel>
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

                <Button
                  type="submit"
                  className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold"
                  disabled={isSubmitting || loading}
                >
                  {(isSubmitting || loading) ? (
                    <div className="h-5 w-5 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Sign in as Administrator
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Looking for standard login?{" "}
                <Link to="/login" className="text-unicorn-gold hover:text-unicorn-gold/80 font-semibold">
                  Click here
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

export default AdminLogin;
