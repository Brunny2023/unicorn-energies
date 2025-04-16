import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Captcha from "@/components/ui/Captcha";
import useCaptcha from "@/hooks/useCaptcha";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { user, signIn, loading } = useAuth();
  const { siteKey, token, verified, handleVerify } = useCaptcha();
  const [captchaError, setCaptchaError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      // Ensure CAPTCHA is verified
      if (!verified || !token) {
        setCaptchaError(true);
        return;
      }
      setCaptchaError(false);

      setFormSubmitting(true);

      // Include the CAPTCHA token in the payload
      const payload = {
        email: data.email,
        password: data.password,
        captchaToken: token, // Add the CAPTCHA token
      };

      // Call the backend or Supabase endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      // Handle success
      console.log("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-unicorn-darkPurple/90">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="relative mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
          {/* Background glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-unicorn-gold/10 blur-xl"></div>

          <div className="relative p-8 bg-unicorn-darkPurple/90 rounded-xl border border-unicorn-gold/30 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="mt-4 text-2xl font-bold text-white">Login to your account</h1>
              <p className="mt-2 text-gray-400">
                Welcome back! Please enter your credentials.
              </p>
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

                {/* CAPTCHA - only show if siteKey is available */}
                {siteKey && (
                  <div className="space-y-4">
                    <Captcha siteKey={siteKey} onVerify={handleVerify} />

                    {captchaError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Please complete the CAPTCHA verification</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold"
                  disabled={loading || formSubmitting}
                >
                  {(loading || formSubmitting) ? (
                    <div className="h-5 w-5 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Login
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-unicorn-gold hover:text-unicorn-gold/80 font-semibold">
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
