
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket } from "@/types/investment";

interface NewTicketFormProps {
  onCreateTicket: (
    subject: string,
    message: string,
    priority: string,
    category: string
  ) => Promise<Ticket | null>;
}

const NewTicketForm: React.FC<NewTicketFormProps> = ({ onCreateTicket }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }
    
    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const ticket = await onCreateTicket(subject, message, priority, category);
      
      if (ticket) {
        // Navigate to the newly created ticket
        navigate(`/dashboard/tickets/${ticket.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-white">Subject</Label>
        <Input
          id="subject"
          placeholder="Brief description of your issue"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm">{errors.subject}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger 
              id="category" 
              className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="account">Account</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-white">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger 
              id="priority" 
              className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white"
            >
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">Message</Label>
        <Textarea
          id="message"
          placeholder="Describe your issue in detail"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white min-h-[150px]"
        />
        {errors.message && (
          <p className="text-red-400 text-sm">{errors.message}</p>
        )}
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </div>
    </form>
  );
};

export default NewTicketForm;
