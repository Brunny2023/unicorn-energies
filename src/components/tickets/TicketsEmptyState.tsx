
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const TicketsEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-unicorn-darkPurple/30 rounded-full p-4 mb-4">
        <MessageSquare className="h-12 w-12 text-unicorn-gold mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No Support Tickets</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        You don't have any support tickets yet. Need help with withdrawals, investments, or account issues? Create a ticket and our team will assist you.
      </p>
      <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-medium">
        <Link to="/dashboard/tickets/new">
          <MessageSquare className="h-4 w-4 mr-2" />
          Create Your First Ticket
        </Link>
      </Button>
    </div>
  );
};

export default TicketsEmptyState;
