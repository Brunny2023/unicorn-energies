
import React from "react";
import { User, Bot } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketMessageContentProps {
  ticket: Ticket;
}

const TicketMessageContent = ({ ticket }: TicketMessageContentProps) => {
  return (
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
  );
};

export default TicketMessageContent;
