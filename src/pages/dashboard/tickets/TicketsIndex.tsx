
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TicketsList from "@/components/tickets/TicketsList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquarePlus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "@/types/investment";

// Sample tickets for development
const DUMMY_TICKETS: Ticket[] = [
  {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Delay",
    status: "open",
    priority: "high",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "withdrawal",
    last_reply_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Plan Question",
    status: "replied",
    priority: "medium",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: "investment",
    last_reply_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Technical Issue with Dashboard",
    status: "closed",
    priority: "low",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    category: "technical",
    closed_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const TicketsIndex = () => {
  const [tickets, setTickets] = useState<Ticket[]>(DUMMY_TICKETS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredTickets = tickets.filter(ticket => {
    // Apply text search
    const matchesSearch = searchQuery === "" || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
            <p className="text-gray-400 mt-1">View and manage your support requests</p>
          </div>
          
          <Link to="/dashboard/tickets/new">
            <Button className="w-full sm:w-auto bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </Link>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-400" />
                <span>Status: {statusFilter === "all" ? "All" : statusFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/20">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-400" />
                <span>Priority: {priorityFilter === "all" ? "All" : priorityFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/20">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Tickets List */}
        <TicketsList />
      </div>
    </DashboardLayout>
  );
};

export default TicketsIndex;
