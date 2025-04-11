
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Ticket } from "@/types/investment";
import { Badge } from "@/components/ui/badge";

interface TicketDetailHeaderProps {
  ticket: Ticket;
}

const TicketDetailHeader = ({ ticket }: TicketDetailHeaderProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Open</Badge>;
      case 'in_progress':
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">Closed</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center mb-2">
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/tickets')}
        className="text-white hover:text-unicorn-gold mr-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      <h2 className="text-2xl font-bold text-white">Ticket #{ticket.id.substring(0, 8)}</h2>
    </div>
  );
};

export default TicketDetailHeader;
