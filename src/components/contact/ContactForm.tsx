
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Captcha from '@/components/ui/Captcha';
import useCaptcha from '@/hooks/useCaptcha';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmit: (formData: FormValues) => Promise<void>;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captcha = useCaptcha();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!captcha.verified) {
      toast({
        variant: "destructive",
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification first.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      form.reset();
      captcha.resetCaptcha && captcha.resetCaptcha();
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent successfully. We\'ll get back to you soon.',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Subject</FormLabel>
              <FormControl>
                <Input placeholder="Message subject" {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your message here..." 
                  {...field} 
                  className="border-gray-300 min-h-[150px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="mt-4">
          <Captcha siteKey={captcha.siteKey} onVerify={captcha.handleVerify} />
        </div>
        
        <div className="text-xs text-gray-500 mt-3">
          By submitting this form, you agree to our <Link to="/terms" className="text-investment-navy hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-investment-navy hover:underline">Privacy Policy</Link>.
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting || !captcha.verified}
          className="w-full bg-investment-navy hover:bg-investment-navy/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Sending Message...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
