
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TicketsListHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
      <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
        <Link to="/dashboard/tickets/new">
          <Plus className="h-4 w-4 mr-2" /> New Ticket
        </Link>
      </Button>
    </div>
  );
};

export default TicketsListHeader;
