
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getUserTickets } from "@/utils/ticketUtils";
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
      
      // For development mode
      if (!user || !user.id) {
        // Use dummy data
        setTimeout(() => {
          setTickets(getDummyTickets());
          setLoading(false);
        }, 1000);
        return;
      }
      
      const fetchedTickets = await getUserTickets(user.id);
      setTickets(fetchedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tickets. Please try again."
      });
      
      // Fallback to dummy data in case of error
      setTickets(getDummyTickets());
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

// Helper function to generate dummy tickets for development
const getDummyTickets = (): Ticket[] => {
  return [
    {
      id: "ticket-1",
      user_id: "dev-user-id",
      subject: "Withdrawal Delay",
      message: "My withdrawal has been pending for 3 days. Can you please check the status?",
      status: "open",
      priority: "high",
      category: "withdrawal",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ticket-2",
      user_id: "dev-user-id",
      subject: "Investment Plan Question",
      message: "I'd like to understand the difference between Goldfish and Dolphin plans.",
      status: "replied",
      priority: "medium",
      category: "investment",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ticket-3",
      user_id: "dev-user-id",
      subject: "Technical Issue with Dashboard",
      message: "The investment charts are not loading correctly on my account.",
      status: "closed",
      priority: "low",
      category: "technical",
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export default TicketsIndex;
