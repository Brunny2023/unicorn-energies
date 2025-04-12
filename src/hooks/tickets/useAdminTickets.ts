
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getAllTickets, 
  updateTicket 
} from '@/utils/ticket/api/index';

/**
 * Hook for admin ticket management
 */
export const useAdminTickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllTickets();
  }, [filterStatus, filterPriority, searchQuery]);

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      
      const allTickets = await getAllTickets();
      console.log("Fetched all tickets:", allTickets);
      
      // Apply filters if they exist
      let filteredTickets = [...allTickets];
      
      if (filterStatus) {
        filteredTickets = filteredTickets.filter(ticket => ticket.status === filterStatus);
      }
      
      if (filterPriority) {
        filteredTickets = filteredTickets.filter(ticket => ticket.priority === filterPriority);
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.subject.toLowerCase().includes(query) || 
          ticket.message.toLowerCase().includes(query)
        );
      }
      
      setTickets(filteredTickets);
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

  const respondToTicket = async (ticketId: string, response: string) => {
    try {
      if (!response.trim()) {
        throw new Error("Response cannot be empty");
      }
      
      const updateData = {
        admin_response: response,
        status: 'responded',
        updated_at: new Date().toISOString()
      };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, ...updateData } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: "Response sent successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error responding to ticket:', err);
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const success = await updateTicket(ticketId, { status });
      
      if (!success) {
        throw new Error("Failed to update ticket status");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status, updated_at: new Date().toISOString() } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: `Ticket status updated to ${status}`,
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket status:', err);
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTicketPriority = async (ticketId: string, priority: string) => {
    try {
      const success = await updateTicket(ticketId, { priority });
      
      if (!success) {
        throw new Error("Failed to update ticket priority");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, priority, updated_at: new Date().toISOString() } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: `Ticket priority updated to ${priority}`,
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket priority:', err);
      toast({
        title: "Error",
        description: "Failed to update ticket priority",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchAllTickets,
    respondToTicket,
    updateTicketStatus,
    updateTicketPriority,
    setFilterStatus,
    setFilterPriority,
    setSearchQuery,
    filterStatus,
    filterPriority,
    searchQuery
  };
};
