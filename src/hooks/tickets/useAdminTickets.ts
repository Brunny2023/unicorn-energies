
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
