
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminRoute from "@/components/auth/AdminRoute"; 
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getAllTickets } from "@/utils/ticketUtils";
import TicketsHeader from "@/components/admin/tickets/TicketsHeader";
import TicketsFilters from "@/components/admin/tickets/TicketsFilters";
import TicketsTable from "@/components/admin/tickets/TicketsTable";

// Development mode flag for testing
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = [
  {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Issue",
    message: "I'm having trouble with my recent withdrawal...",
    status: "open",
    priority: "high",
    category: "withdrawal",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Question",
    message: "Can you explain how the Gold plan works?",
    status: "closed",
    priority: "medium",
    category: "investment",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals.",
    status: "in_progress",
    priority: "medium",
    category: "account",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const AdminTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets, selectedStatuses, selectedPriorities]);

  const fetchTickets = async () => {
    console.log("Fetching tickets in admin panel");
    setLoading(true);
    try {
      // Use development data when in development mode
      if (DEVELOPMENT_MODE) {
        console.log("Using dummy tickets data for development");
        setTimeout(() => {
          setTickets(DUMMY_TICKETS as Ticket[]);
          setFilteredTickets(DUMMY_TICKETS as Ticket[]);
          setLoading(false);
        }, 1000); // Simulate loading delay
        return;
      }

      // Production mode - fetch real data
      const ticketsData = await getAllTickets();
      console.log("Tickets data fetched:", ticketsData);
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        title: "Error",
        description: "Failed to load tickets. Please try again.",
        variant: "destructive"
      });
      // Fall back to dummy data
      setTickets(DUMMY_TICKETS as Ticket[]);
      setFilteredTickets(DUMMY_TICKETS as Ticket[]);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((ticket) =>
        selectedStatuses.includes(ticket.status)
      );
    }

    if (selectedPriorities.length > 0) {
      filtered = filtered.filter((ticket) =>
        selectedPriorities.includes(ticket.priority)
      );
    }

    setFilteredTickets(filtered);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <TicketsHeader title="Support Tickets" onRefresh={fetchTickets} />
        
        <TicketsFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
        />
        
        <TicketsTable 
          loading={loading} 
          filteredTickets={filteredTickets} 
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminTickets;
