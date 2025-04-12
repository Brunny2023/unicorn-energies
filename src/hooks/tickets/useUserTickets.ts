
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
    // Modified to not immediately call fetchUserTickets when component mounts
    // This avoids calling getUserTickets when user is null
    if (user?.id) {
      fetchUserTickets();
    } else {
      // If no user, set loading to false to avoid infinite loading state
      setLoading(false);
    }
  }, [user]);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user || !user.id) {
        // Instead of throwing an error, we'll return early and set dev-friendly tickets for testing
        console.log("No authenticated user, using sample tickets for development");
        const sampleTickets = [
          {
            id: "sample-1",
            user_id: "dev-user",
            subject: "Sample Ticket 1",
            message: "This is a sample ticket for development",
            status: "open",
            priority: "medium",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            category: "general"
          },
          {
            id: "sample-2",
            user_id: "dev-user",
            subject: "Sample Ticket 2",
            message: "Another sample ticket for testing the interface",
            status: "resolved",
            priority: "high",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date().toISOString(),
            category: "withdrawal"
          }
        ] as Ticket[];
        
        setTickets(sampleTickets);
        setLoading(false);
        return;
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
