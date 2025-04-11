
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketListItemProps {
  ticket: Ticket;
}

const TicketListItem: React.FC<TicketListItemProps> = ({ ticket }) => {
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
      case 'in-progress':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Closed</Badge>;
      case 'replied':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Replied</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>;
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
    <div className="p-4 border border-unicorn-gold/20 rounded-lg bg-unicorn-darkPurple/50 hover:bg-unicorn-darkPurple/70 transition-colors">
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

export default TicketListItem;
