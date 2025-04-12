
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAdminTickets } from "@/hooks/useTickets";
import TicketsHeader from "@/components/admin/tickets/TicketsHeader";
import TicketsFilters from "@/components/admin/tickets/TicketsFilters";
import TicketsTable from "@/components/admin/tickets/TicketsTable";

const AdminTickets = () => {
  const { tickets, loading, error, fetchAllTickets } = useAdminTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  // Update filtered tickets whenever filters change
  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets, selectedStatuses, selectedPriorities]);

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
        <TicketsHeader title="Support Tickets" onRefresh={fetchAllTickets} />
        
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
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-red-500">
            {error}. <button 
              className="underline"
              onClick={() => fetchAllTickets()}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminTickets;
