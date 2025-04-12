
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getTicketDetails, 
  updateTicket 
} from '@/utils/ticket/api/index';

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
