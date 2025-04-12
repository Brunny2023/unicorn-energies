
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getTicketDetails, 
  updateTicket 
} from '@/utils/ticket/api/index';

/**
 * Hook for managing a single ticket with optimized performance
 */
export const useTicketDetails = (ticketId: string | undefined) => {
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetch function
  const fetchTicket = useCallback(async (id: string) => {
    if (!id) return;
    
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
  }, [toast]);

  // Effect to fetch ticket when ID changes
  useEffect(() => {
    if (ticketId) {
      fetchTicket(ticketId);
    } else {
      // Reset state when no ticket ID is provided
      setTicket(null);
      setLoading(false);
      setError(null);
    }
  }, [ticketId, fetchTicket]);

  // Optimized update function with type safety
  const updateTicketDetails = useCallback(async (updateData: Partial<Ticket>) => {
    if (!ticketId || !ticket) {
      toast({
        title: "Error",
        description: "Cannot update: Ticket not loaded",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      setLoading(true);
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket");
      }
      
      // Optimistic update to avoid refetching
      setTicket(prevTicket => {
        if (!prevTicket) return null;
        return {
          ...prevTicket,
          ...updateData,
          updated_at: new Date().toISOString()
        };
      });
      
      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket:', err);
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [ticketId, ticket, toast]);

  // Memoized refresh function
  const refreshTicket = useCallback(() => {
    if (ticketId) {
      fetchTicket(ticketId);
    }
  }, [ticketId, fetchTicket]);

  return {
    ticket,
    loading,
    error,
    fetchTicket,
    updateTicketDetails,
    refreshTicket
  };
};
