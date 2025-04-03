
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const { resetPassword, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    await resetPassword(data.email);
    setSubmitted(true);
  };

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
              <h1 className="mt-4 text-2xl font-bold text-white">Reset your password</h1>
              <p className="mt-2 text-gray-400">
                Enter your email and we'll send you a reset link
              </p>
            </div>
            
            {submitted ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center p-4 bg-green-900/30 rounded-full mb-4">
                  <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white">Check your email</h3>
                <p className="mt-2 text-gray-400">
                  We've sent a password reset link to your email address. Please check your inbox.
                </p>
                <Button asChild className="mt-6 bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold">
                  <Link to="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                  </Link>
                </Button>
              </div>
            ) : (
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

                  <Button
                    type="submit"
                    className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Send Reset Link
                  </Button>
                </form>
              </Form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                <Link to="/login" className="text-unicorn-gold hover:text-unicorn-gold/80 font-semibold flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
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

export default ForgotPassword;
