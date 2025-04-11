
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";

// Development mode flag
const DEVELOPMENT_MODE = true;

const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject is too long"),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000, "Message is too long"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewTicketForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
      priority: "medium",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    
    try {
      // In development mode, simulate ticket creation
      if (DEVELOPMENT_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        setSuccess(true);
        
        setTimeout(() => {
          navigate("/dashboard/tickets");
        }, 2000);
        
        return;
      }
      
      // For production, create real ticket
      const { data, error } = await supabase
        .from('tickets')
        .insert([
          {
            user_id: user?.id,
            subject: values.subject,
            message: values.message,
            priority: values.priority,
            status: 'open',
          },
        ])
        .select();

      if (error) throw error;
      
      setSuccess(true);
      
      toast({
        title: "Ticket Created",
        description: "Your support ticket has been submitted successfully.",
      });
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/dashboard/tickets");
      }, 2000);
      
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to create support ticket. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-white mb-2">Ticket Submitted Successfully!</h3>
          <p className="text-gray-400 text-center mb-6">
            Your support ticket has been created. We'll respond to your inquiry shortly.
          </p>
          <p className="text-gray-500">Redirecting to tickets list...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Submit a Support Ticket</CardTitle>
        <CardDescription className="text-gray-400">
          Describe your issue or question, and our support team will assist you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Brief description of your issue"
                      className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-500"
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Priority</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={submitting}
                    >
                      <SelectTrigger className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
                        <SelectItem value="low" className="text-green-500">Low</SelectItem>
                        <SelectItem value="medium" className="text-yellow-500">Medium</SelectItem>
                        <SelectItem value="high" className="text-red-500">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your issue in detail..."
                      className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-500 min-h-[150px]"
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewTicketForm;
