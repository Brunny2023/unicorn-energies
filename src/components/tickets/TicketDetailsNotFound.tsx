
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const TicketDetailsNotFound = () => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardContent className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <CardTitle className="text-white mb-2">Ticket Not Found</CardTitle>
        <CardDescription className="text-gray-400 mb-6">
          The ticket you're looking for doesn't exist or you don't have permission to view it.
        </CardDescription>
        <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          <Link to="/dashboard/tickets">View All Tickets</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicketDetailsNotFound;
