
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TicketDetailsNotFoundProps {
  message?: string;
}

const TicketDetailsNotFound: React.FC<TicketDetailsNotFoundProps> = ({ 
  message = "Ticket not found" 
}) => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Ticket Not Found</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="bg-unicorn-darkPurple/30 rounded-full p-4 mb-4">
          {message.toLowerCase().includes("error") ? (
            <AlertOctagon className="h-12 w-12 text-red-400 mx-auto" />
          ) : (
            <Search className="h-12 w-12 text-gray-400 mx-auto" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {message.toLowerCase().includes("error") ? "Error Loading Ticket" : "Ticket Not Found"}
        </h3>
        <p className="text-gray-400 mb-6 max-w-md text-center">
          {message}
        </p>
        <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-medium">
          <Link to="/dashboard/tickets">
            Return to Tickets
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicketDetailsNotFound;
