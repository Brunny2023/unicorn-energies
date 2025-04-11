
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketDetailsContentProps {
  ticket: Ticket;
}

const TicketDetailsContent: React.FC<TicketDetailsContentProps> = ({ ticket }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardContent className="space-y-6 pt-6">
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
  );
};

export default TicketDetailsContent;
