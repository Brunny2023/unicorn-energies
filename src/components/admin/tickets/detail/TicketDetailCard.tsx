
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/investment";
import { formatDistanceToNow } from "date-fns";
import TicketHeaderInfo from "./TicketHeaderInfo";
import TicketMessageContent from "./TicketMessageContent";
import { getStatusBadge, getPriorityBadge } from "./ticketBadgeUtils";
import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCw } from "lucide-react";
import { aiTicketService } from "@/utils/ticket/aiTicketService";
import { useToast } from "@/hooks/use-toast";

interface TicketDetailCardProps {
  ticket: Ticket;
  onRefresh?: () => void;
}

const TicketDetailCard: React.FC<TicketDetailCardProps> = ({ 
  ticket,
  onRefresh
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleGenerateAIResponse = async () => {
    try {
      setIsProcessing(true);
      const success = await aiTicketService.autoRespondToTicket(ticket);
      
      if (success) {
        toast({
          title: "Success",
          description: "AI response generated successfully",
        });
        if (onRefresh) {
          onRefresh();
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to generate AI response",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error generating AI response:", err);
      toast({
        title: "Error",
        description: "An error occurred while generating AI response",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardContent className="p-0">
        <TicketHeaderInfo ticket={ticket} />
        
        <div className="px-6 py-4 border-t border-unicorn-gold/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-white">{ticket.subject}</h3>
            <div className="space-x-2">
              {getPriorityBadge(ticket.priority)}
              {getStatusBadge(ticket.status)}
            </div>
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            Created {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
            {ticket.updated_at !== ticket.created_at && (
              <span className="ml-2">
                • Updated {formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })}
              </span>
            )}
          </div>
          
          <TicketMessageContent 
            title="User Message" 
            content={ticket.message} 
            authorType="user" 
          />
          
          {ticket.ai_response && (
            <div className="mt-6">
              <TicketMessageContent 
                title="AI Response" 
                content={ticket.ai_response} 
                authorType="ai"
                timestamp={ticket.ai_responded_at ? formatDate(ticket.ai_responded_at) : undefined}
              />
            </div>
          )}
          
          {!ticket.ai_response && (
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="border-unicorn-purple text-unicorn-gold hover:bg-unicorn-purple/20"
                onClick={handleGenerateAIResponse}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Generate AI Response
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDetailCard;
