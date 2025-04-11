
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/investment";
import { User, Bot } from "lucide-react";

interface TicketDetailCardProps {
  ticket: Ticket;
  response: string;
  setResponse: (value: string) => void;
  handleSubmitResponse: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const TicketDetailCard = ({ 
  ticket, 
  response, 
  setResponse, 
  handleSubmitResponse, 
  isSubmitting 
}: TicketDetailCardProps) => {
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
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="text-xl text-white">{ticket.subject}</CardTitle>
            <div className="flex mt-2 space-x-2">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>Created: {new Date(ticket.created_at).toLocaleString()}</div>
            <div>Last Updated: {new Date(ticket.updated_at).toLocaleString()}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-unicorn-darkPurple border border-unicorn-gold/20 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-unicorn-gold">User Message</div>
                <div className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleString()}</div>
              </div>
            </div>
            <div className="text-white whitespace-pre-line">
              {ticket.message}
            </div>
          </div>

          {ticket.ai_response && (
            <div className="bg-unicorn-purple/10 border border-unicorn-gold/10 rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-unicorn-gold">AI Assistant</div>
                  <div className="text-xs text-gray-400">
                    {ticket.ai_responded_at ? new Date(ticket.ai_responded_at).toLocaleString() : 'Automated Response'}
                  </div>
                </div>
              </div>
              <div className="text-white whitespace-pre-line">
                {ticket.ai_response}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDetailCard;
