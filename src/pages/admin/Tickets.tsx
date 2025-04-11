
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getAllTickets } from "@/utils/ticket";
import TicketsHeader from "@/components/admin/tickets/TicketsHeader";
import TicketsFilters from "@/components/admin/tickets/TicketsFilters";
import TicketsTable from "@/components/admin/tickets/TicketsTable";

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
