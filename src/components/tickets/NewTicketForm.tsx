import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { createSupportTicket as createTicket } from '@/utils/investmentUtils';

const NewTicketForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      priority: value as 'low' | 'medium' | 'high'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.subject.trim() || !form.message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const success = await createTicket(
        user?.id as string,
        form.subject,
        form.message,
        form.priority
      );
      
      if (success) {
        toast({
          title: "Ticket Created",
          description: "Your support ticket has been submitted successfully"
        });
        navigate('/dashboard/tickets');
      } else {
        throw new Error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem creating your ticket. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Create Support Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Brief description of your issue"
              value={form.subject}
              onChange={handleChange}
              className="bg-unicorn-darkPurple/60 border-unicorn-gold/30 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Provide details about your issue"
              value={form.message}
              onChange={handleChange}
              className="min-h-[150px] bg-unicorn-darkPurple/60 border-unicorn-gold/30 text-white"
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-white">Priority</Label>
            <RadioGroup 
              value={form.priority} 
              onValueChange={handlePriorityChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-400">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-amber-400">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-red-400">High</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex space-x-3 pt-3">
            <Button
              type="button"
              variant="outline"
              className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/20"
              onClick={() => navigate('/dashboard/tickets')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTicketForm;
