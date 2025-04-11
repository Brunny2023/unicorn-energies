
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle2, MessageSquare } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketDetailsHeaderProps {
  ticket: Ticket;
}

const TicketDetailsHeader: React.FC<TicketDetailsHeaderProps> = ({ ticket }) => {
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_progress':
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'closed':
        return <CheckCircle2 className="h-5 w-5 text-gray-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
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
          Ticket #{ticket.id.substring(0, 8)} • {ticket.category} • Created {formatDate(ticket.created_at)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TicketDetailsHeader;
