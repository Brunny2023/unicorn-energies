
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getUserTickets, 
  createSupportTicket, 
  getTicketDetails, 
  updateTicket 
} from '@/utils/ticket';

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
      
      // Update local state
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

/**
 * Hook for managing a single ticket
 */
export const useTicketDetails = (ticketId: string | undefined) => {
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ticketId) {
      fetchTicket(ticketId);
    }
  }, [ticketId]);

  const fetchTicket = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching ticket details for ID:", id);
      const ticketData = await getTicketDetails(id);
      
      if (!ticketData) {
        throw new Error("Ticket not found");
      }
      
      setTicket(ticketData);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      setError('Failed to load ticket details');
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicketDetails = async (updateData: Partial<Ticket>) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!ticketId) {
        throw new Error("Ticket ID is required");
      }
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket");
      }
      
      // Update local state
      if (ticket) {
        setTicket({
          ...ticket,
          ...updateData,
          updated_at: new Date().toISOString()
        });
      }
      
      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket:', err);
      setError('Failed to update ticket');
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    ticket,
    loading,
    error,
    fetchTicket,
    updateTicketDetails
  };
};

/**
 * Hook for admin ticket management
 */
export const useAdminTickets = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Admin: Fetching all tickets");
      const allTickets = await getAllTickets();
      console.log("Admin: All tickets fetched:", allTickets.length);
      setTickets(allTickets);
    } catch (err) {
      console.error('Error fetching all tickets:', err);
      setError('Failed to load tickets');
      toast({
        title: "Error",
        description: "Failed to load all tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const respondToTicket = async (
    ticketId: string, 
    response: string, 
    newStatus: 'resolved' | 'closed' = 'resolved'
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const updateData = {
        ai_response: response,
        ai_responded_at: new Date().toISOString(),
        status: newStatus
      };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to respond to ticket");
      }
      
      // Update local state
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, ...updateData, updated_at: new Date().toISOString() } 
          : ticket
      ));
      
      toast({
        title: "Success",
        description: "Response added to ticket",
      });
      
      return true;
    } catch (err) {
      console.error('Error responding to ticket:', err);
      setError('Failed to respond to ticket');
      toast({
        title: "Error",
        description: "Failed to respond to ticket",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchAllTickets,
    respondToTicket
  };
};
