
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/investment";
import { aiTicketService } from "@/utils/ticket/aiTicketService";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle, AlertCircle, CheckCircle } from "lucide-react";

interface AIProcessingPanelProps {
  onRefreshTickets: () => void;
}

const AIProcessingPanel: React.FC<AIProcessingPanelProps> = ({ onRefreshTickets }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<{
    processed: number;
    successful: number;
    failed: number;
    timestamp: string;
  } | null>(null);

  const handleProcessTickets = async () => {
    try {
      setIsProcessing(true);
      
      const result = await aiTicketService.processOpenTickets();
      
      setLastResult({
        ...result,
        timestamp: new Date().toISOString(),
      });
      
      if (result.successful > 0) {
        toast({
          title: "AI Processing Complete",
          description: `Successfully processed ${result.successful} ticket(s)`,
          variant: "default",
        });
      } else {
        toast({
          title: "AI Processing Complete",
          description: "No tickets were successfully processed",
          variant: "default",
        });
      }
      
      // Refresh the tickets list
      onRefreshTickets();
    } catch (err) {
      console.error("Error processing tickets:", err);
      toast({
        title: "Processing Error",
        description: "Failed to process tickets with AI",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSingleTicketProcess = async (ticket: Ticket) => {
    try {
      setIsProcessing(true);
      
      const success = await aiTicketService.autoRespondToTicket(ticket);
      
      if (success) {
        toast({
          title: "Success",
          description: `AI response generated for ticket: ${ticket.subject}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Processing Failed",
          description: `Could not generate AI response for ticket: ${ticket.subject}`,
          variant: "destructive",
        });
      }
      
      // Refresh the tickets list
      onRefreshTickets();
    } catch (err) {
      console.error("Error processing single ticket:", err);
      toast({
        title: "Processing Error",
        description: "Failed to process ticket with AI",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center">
          AI Ticket Processing
          <Badge className="ml-2 bg-unicorn-purple/50 text-xs">Beta</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-sm">
              Automatically process open tickets with AI-powered responses
            </p>
            
            <Button
              onClick={handleProcessTickets}
              disabled={isProcessing}
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              {isProcessing ? "Processing..." : "Process Open Tickets"}
            </Button>
          </div>
          
          {lastResult && (
            <div className="mt-4 p-3 rounded-md bg-unicorn-purple/20">
              <h4 className="text-white text-sm font-medium mb-2">Last Processing Result:</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-gray-700/50 text-white">
                    Processed: {lastResult.processed}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Successful: {lastResult.successful}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Failed: {lastResult.failed}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(lastResult.timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProcessingPanel;
