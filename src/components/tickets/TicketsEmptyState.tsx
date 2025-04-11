
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const TicketsEmptyState = () => {
  return (
    <div className="text-center py-8">
      <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
      <p className="text-gray-400 mb-4">You don't have any support tickets yet.</p>
      <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
        <Link to="/dashboard/tickets/new">Create Your First Ticket</Link>
      </Button>
    </div>
  );
};

export default TicketsEmptyState;
