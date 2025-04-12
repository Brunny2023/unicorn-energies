
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getUserTickets, 
  createSupportTicket
} from '@/utils/ticket/api/index';

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
    if (user) {
      fetchUserTickets();
    }
  }, [user]);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }
      
      const fetchedTickets = await getUserTickets(user.id);
      console.log("Fetched user tickets:", fetchedTickets);
      
      if (Array.isArray(fetchedTickets)) {
        setTickets(fetchedTickets);
      } else {
        console.error("Unexpected response format:", fetchedTickets);
        setTickets([]);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets');
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive",
      });
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (
    subject: string, 
    message: string, 
    priority: string = "medium", 
    category: string = "general"
  ): Promise<Ticket | null> => {
    try {
      setLoading(true);
      
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }
      
      const newTicket = await createSupportTicket(user.id, subject, message, priority, category);
      
      if (newTicket) {
        setTickets(prevTickets => [newTicket, ...prevTickets]);
        
        toast({
          title: "Success",
          description: "Ticket created successfully",
        });
        
        return newTicket;
      } else {
        throw new Error("Failed to create ticket");
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      toast({
        title: "Error",
        description: "Failed to create ticket",
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
    fetchUserTickets,
    createTicket
  };
};
