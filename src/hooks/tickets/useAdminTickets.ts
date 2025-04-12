
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getAllTickets, 
  updateTicket 
} from '@/utils/ticket/api';

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
      const allTicketsData = await getAllTickets();
      console.log("Admin: All tickets fetched:", allTicketsData.length);
      setTickets(allTicketsData);
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
