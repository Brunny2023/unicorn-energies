
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Development mode flag
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = {
  "ticket-1": {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Issue",
    message: "I'm having trouble with my recent withdrawal. I submitted a withdrawal request for $1,500 two days ago, but it's still showing as pending in my account. The estimated processing time was 24 hours. Could you please check the status of my withdrawal and let me know when I can expect to receive the funds? My transaction ID is WD-78943.",
    status: "open",
    priority: "high",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  "ticket-2": {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Question",
    message: "Can you explain how the Gold plan works? I'm interested in investing but I want to understand the details of the returns calculation, the lock-up period, and any fees that might apply to early withdrawals. Also, what's the minimum investment amount for this plan?",
    status: "closed",
    priority: "medium",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: "The Gold investment plan offers a daily return rate of 0.5% over a 30-day period. Your investment remains locked for the full 30 days, during which you'll earn daily returns that are added to your account balance. The minimum investment amount for the Gold plan is $1,000.\n\nRegarding early withdrawals: If you need to withdraw before the 30-day period ends, a 10% early withdrawal fee will be applied to your initial investment amount. However, you'll still receive all accrued returns up to the withdrawal date.\n\nAll returns are automatically credited to your account daily, and you can track the performance of your investment in real-time from your dashboard.\n\nIf you have any other questions about the Gold plan or any of our other investment options, please let us know!",
    ai_responded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  "ticket-3": {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals. I understand that for withdrawals over $10,000, additional verification is required. Could you please let me know what documents I need to provide and how to complete this process? I'm planning to make a withdrawal next week and want to make sure everything is ready.",
    status: "in_progress",
    priority: "medium",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
};

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

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In development mode, use dummy data
    if (DEVELOPMENT_MODE && id) {
      setTimeout(() => {
        const dummyTicket = DUMMY_TICKETS[id as keyof typeof DUMMY_TICKETS];
        if (dummyTicket) {
          setTicket(dummyTicket);
        } else {
          toast({
            title: "Error",
            description: "Ticket not found",
            variant: "destructive",
          });
        }
        setLoading(false);
      }, 1000); // Add a small delay to simulate loading
      return;
    }

    // For production, fetch real data
    if (user && id) {
      fetchTicket(id);
    }
  }, [user, id]);

  const fetchTicket = async (ticketId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', ticketId)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setTicket(data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
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
      hour: '2-digit',
      minute: '2-digit',
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_progress':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'closed':
        return <CheckCircle2 className="h-5 w-5 text-gray-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm" className="text-gray-400">
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
            </Link>
          </Button>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <div className="h-6 bg-unicorn-gold/20 rounded w-1/3 animate-pulse mb-2"></div>
            <div className="h-4 bg-unicorn-gold/10 rounded w-1/2 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-unicorn-gold/10 rounded w-3/4 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm" className="text-gray-400">
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
            </Link>
          </Button>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-white mb-2">Ticket Not Found</CardTitle>
            <CardDescription className="text-gray-400 mb-6">
              The ticket you're looking for doesn't exist or you don't have permission to view it.
            </CardDescription>
            <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
              <Link to="/dashboard/tickets">View All Tickets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button asChild variant="outline" size="sm" className="text-gray-400">
          <Link to="/dashboard/tickets">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
          </Link>
        </Button>
      </div>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div className="flex items-center">
              {getStatusIcon(ticket.status)}
              <CardTitle className="text-white ml-2">{ticket.subject}</CardTitle>
            </div>
            <div className="flex space-x-2">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
          </div>
          <CardDescription className="text-gray-400">
            Ticket #{ticket.id.substring(0, 8)} • Created {formatDate(ticket.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Message */}
          <div className="rounded-lg bg-unicorn-darkPurple/50 border border-unicorn-gold/20 p-4">
            <p className="text-white whitespace-pre-wrap">{ticket.message}</p>
          </div>

          {/* AI Response */}
          {ticket.ai_response && (
            <div className="rounded-lg bg-unicorn-purple/10 border border-unicorn-gold/20 p-4">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-5 w-5 text-unicorn-gold mr-2" />
                <p className="text-unicorn-gold font-medium">Support Response</p>
              </div>
              <p className="text-white whitespace-pre-wrap">{ticket.ai_response}</p>
              {ticket.ai_responded_at && (
                <p className="text-gray-500 text-sm mt-2">
                  Responded on {formatDate(ticket.ai_responded_at)}
                </p>
              )}
            </div>
          )}

          {/* Reply Section */}
          {ticket.status !== 'closed' && (
            <div className="pt-4 border-t border-unicorn-gold/20">
              <p className="text-gray-400 mb-4">
                {ticket.status === 'open' 
                  ? "Our support team will respond to your ticket shortly." 
                  : "Our team is currently reviewing your ticket."}
              </p>
              <Button 
                variant="outline" 
                className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Add Reply
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetails;
