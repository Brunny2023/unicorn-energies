
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

const TicketHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
        <p className="text-gray-400 mt-1">View and manage your support requests</p>
      </div>
      
      <Link to="/dashboard/tickets/new">
        <Button className="w-full sm:w-auto bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </Link>
    </div>
  );
};

export default TicketHeader;
