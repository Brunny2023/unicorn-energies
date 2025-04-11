
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquarePlus, Filter, Search, AlertCircle, Inbox, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "@/types/investment";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getUserTickets } from "@/utils/investmentUtils";

// Sample tickets for development
const DUMMY_TICKETS: Ticket[] = [
  {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Delay",
    message: "My withdrawal has been pending for 3 days. Can you please check the status?",
    status: "open",
    priority: "high",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "withdrawal",
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Plan Question",
    message: "I'd like to understand the difference between Goldfish and Dolphin plans.",
    status: "replied",
    priority: "medium",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: "investment",
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Technical Issue with Dashboard",
    message: "The investment charts are not loading correctly on my account.",
    status: "closed",
    priority: "low",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    category: "technical",
    updated_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Development mode flag
const DEVELOPMENT_MODE = true;

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
      
      if (DEVELOPMENT_MODE) {
        // Simulate API call delay
        setTimeout(() => {
          setTickets(DUMMY_TICKETS);
          setLoading(false);
        }, 1000);
        return;
      }
      
      if (user && user.id) {
        const fetchedTickets = await getUserTickets(user.id);
        setTickets(fetchedTickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tickets. Please try again."
      });
      
      // Fallback to dummy data in case of error
      setTickets(DUMMY_TICKETS);
    } finally {
      setLoading(false);
    }
  };
  
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-yellow-500';
      case 'replied':
        return 'text-blue-500';
      case 'in-progress':
        return 'text-purple-500';
      case 'resolved':
      case 'closed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Inbox className="h-4 w-4 text-blue-500" />;
      default:
        return <Inbox className="h-4 w-4 text-gray-500" />;
    }
  };

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
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
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
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white">Your Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-unicorn-darkPurple/50 p-4 rounded-md animate-pulse">
                    <div className="h-5 w-3/4 bg-unicorn-gold/20 rounded mb-2"></div>
                    <div className="h-4 w-1/4 bg-unicorn-gold/20 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-8">
                <Inbox className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-white">No tickets found</h3>
                <p className="text-gray-400 mt-1 mb-4">
                  {tickets.length === 0 
                    ? "You haven't created any support tickets yet." 
                    : "No tickets match your current filters."}
                </p>
                <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                  <Link to="/dashboard/tickets/new">Create Your First Ticket</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Link key={ticket.id} to={`/dashboard/tickets/${ticket.id}`}>
                    <div className="flex items-start justify-between p-4 border border-unicorn-gold/20 bg-unicorn-darkPurple/50 rounded-md hover:bg-unicorn-darkPurple/70 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getPriorityIcon(ticket.priority)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{ticket.subject}</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {ticket.message.length > 80 
                              ? `${ticket.message.substring(0, 80)}...` 
                              : ticket.message}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className="text-xs px-2 py-1 bg-unicorn-darkPurple/70 rounded-full">
                              #{ticket.id.substring(0, 8)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(ticket.created_at).toLocaleDateString()}
                            </span>
                            <span className={`text-xs capitalize ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs uppercase px-2 py-1 rounded-full border border-unicorn-gold/20 text-unicorn-gold">
                        {ticket.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TicketsIndex;
