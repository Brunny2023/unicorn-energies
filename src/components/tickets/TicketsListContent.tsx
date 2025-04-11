
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronRight } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketsListContentProps {
  tickets: Ticket[];
  loading: boolean;
}

const TicketsListContent: React.FC<TicketsListContentProps> = ({ tickets, loading }) => {
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
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Tickets</CardTitle>
        <CardDescription className="text-gray-400">
          View and manage your support requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TicketsLoadingSkeleton />
        ) : tickets.length === 0 ? (
          <TicketsEmptyState />
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketListItem 
                key={ticket.id} 
                ticket={ticket}
                getStatusBadge={getStatusBadge}
                getPriorityBadge={getPriorityBadge}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TicketsLoadingSkeleton = () => {
  return (
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
  );
};

const TicketsEmptyState = () => {
  return (
    <div className="text-center py-8">
      <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
      <p className="text-gray-400 mb-4">You don't have any support tickets yet.</p>
      <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
        <Link to="/dashboard/tickets/new">Create Your First Ticket</Link>
      </Button>
    </div>
  );
};

interface TicketListItemProps {
  ticket: Ticket;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority: string) => React.ReactNode;
  formatDate: (date: string) => string;
}

const TicketListItem: React.FC<TicketListItemProps> = ({ 
  ticket, 
  getStatusBadge, 
  getPriorityBadge,
  formatDate
}) => {
  return (
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
  );
};

export default TicketsListContent;
