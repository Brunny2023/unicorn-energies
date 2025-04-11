
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getUserTickets } from "@/utils/ticket";
import TicketHeader from "@/components/tickets/TicketHeader";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketList from "@/components/tickets/TicketList";

const TicketsIndex = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  useEffect(() => {
    fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      
      if (user && user.id) {
        console.log("Fetching tickets for user:", user.id);
        const fetchedTickets = await getUserTickets(user.id);
        console.log("Tickets fetched:", fetchedTickets.length);
        setTickets(fetchedTickets);
      } else {
        console.log("No user found or user has no ID");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tickets. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };
  
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
      </div>
    </DashboardLayout>
  );
};

export default TicketsIndex;
