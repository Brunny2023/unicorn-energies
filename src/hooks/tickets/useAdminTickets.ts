
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/types/investment';
import { 
  getAllTickets, 
  updateTicket 
} from '@/utils/ticket/api/index';
import { useTicketResponse } from './useTicketResponse';
import { useTicketStatusManager } from './useTicketStatusManager';
import { useTicketPriorityManager } from './useTicketPriorityManager';

type TicketStatus = "open" | "in-progress" | "resolved" | "closed" | "replied";
type TicketPriority = "high" | "medium" | "low";

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

  // Use the sub-hooks for specific ticket management features
  const { respondToTicket } = useTicketResponse(tickets, setTickets, toast);
  const { updateTicketStatus } = useTicketStatusManager(tickets, setTickets, toast);
  const { updateTicketPriority } = useTicketPriorityManager(tickets, setTickets, toast);

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

  // Adding type safety to ticket admin operations
  const respondToTicketAsAdmin = async (ticketId: string, adminResponse: string) => {
    try {
      const updateData: Partial<Ticket> = {
        ai_response: adminResponse,
        status: "replied" as TicketStatus,
        updated_at: new Date().toISOString()
      };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket with admin response");
      }
      
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, ...updateData } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: "Admin response sent successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error sending admin response:', err);
      toast({
        title: "Error",
        description: "Failed to send admin response",
        variant: "destructive",
      });
      return false;
    }
  };

  // Type-safe status update
  const setTicketStatus = async (ticketId: string, newStatus: TicketStatus) => {
    return await updateTicketStatus(ticketId, newStatus);
  };

  // Type-safe priority update
  const setTicketPriority = async (ticketId: string, newPriority: TicketPriority) => {
    return await updateTicketPriority(ticketId, newPriority);
  };

  return {
    tickets,
    loading,
    error,
    fetchAllTickets,
    respondToTicket: respondToTicketAsAdmin,
    updateTicketStatus: setTicketStatus,
    updateTicketPriority: setTicketPriority,
    setFilterStatus,
    setFilterPriority,
    setSearchQuery,
    filterStatus,
    filterPriority,
    searchQuery
  };
};
