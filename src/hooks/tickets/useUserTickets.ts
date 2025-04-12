
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getUserTickets, 
  createSupportTicket
} from '@/utils/ticket/api';

/**
 * Hook for managing user tickets
 */
export const useUserTickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchTickets();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      
      console.log("Fetching tickets for user:", user.id);
      const ticketData = await getUserTickets(user.id);
      console.log("Tickets fetched:", ticketData.length);
      setTickets(ticketData);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets');
      toast({
        title: "Error",
        description: "Failed to load support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (
    subject: string, 
    message: string, 
    priority: string, 
    category: string = 'general'
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      
      const newTicket = await createSupportTicket(
        user.id,
        subject,
        message,
        priority,
        category
      );
      
      if (!newTicket) {
        throw new Error("Failed to create ticket");
      }
      
      setTickets(prev => [newTicket, ...prev]);
      
      toast({
        title: "Success",
        description: "Support ticket created successfully",
      });
      
      return newTicket;
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket');
      toast({
        title: "Error",
        description: "Failed to create support ticket",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket
  };
};
