
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useUserTickets } from "@/hooks/useTickets";
import TicketHeader from "@/components/tickets/TicketHeader";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketList from "@/components/tickets/TicketList";

const TicketsIndex = () => {
  const { tickets, loading, error } = useUserTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  const filteredTickets = tickets.filter(ticket => {
    // Apply text search
    const matchesSearch = searchQuery === "" || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TicketHeader />
        
        {/* Filters */}
        <TicketFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        
        {/* Tickets List */}
        <TicketList 
          loading={loading} 
          tickets={tickets} 
          filteredTickets={filteredTickets} 
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TicketsIndex;
