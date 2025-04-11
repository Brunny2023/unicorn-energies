
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Development mode flag
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
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: "The Gold plan offers a daily return of 0.5% for 30 days..."
  },
  {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals.",
    status: "in_progress",
    priority: "medium",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  ai_response?: string;
  ai_responded_at?: string;
}

const TicketsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In development mode, use dummy data
    if (DEVELOPMENT_MODE) {
      setTimeout(() => {
        setTickets(DUMMY_TICKETS);
        setLoading(false);
      }, 1000); // Add a small delay to simulate loading
      return;
    }

    // For production, fetch real data
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
        <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          <Link to="/dashboard/tickets/new">
            <Plus className="h-4 w-4 mr-2" /> New Ticket
          </Link>
        </Button>
      </div>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <CardTitle className="text-white">Your Tickets</CardTitle>
          <CardDescription className="text-gray-400">
            View and manage your support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="p-4 border border-unicorn-gold/20 rounded-lg animate-pulse"
                >
                  <div className="flex justify-between mb-2">
                    <div className="h-6 bg-unicorn-gold/20 rounded w-1/3"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-unicorn-gold/20 rounded w-16"></div>
                      <div className="h-6 bg-unicorn-gold/20 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-unicorn-gold/10 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-unicorn-gold/10 rounded w-1/4"></div>
                    <div className="h-8 bg-unicorn-gold/10 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">You don't have any support tickets yet.</p>
              <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                <Link to="/dashboard/tickets/new">Create Your First Ticket</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className="p-4 border border-unicorn-gold/20 rounded-lg bg-unicorn-darkPurple/50 hover:bg-unicorn-darkPurple/70 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                    <div className="flex space-x-2">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-1">{ticket.message}</p>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="text-sm text-gray-500">
                      Created on {formatDate(ticket.created_at)}
                    </div>
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm"
                      className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20"
                    >
                      <Link to={`/dashboard/tickets/${ticket.id}`}>
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsList;
