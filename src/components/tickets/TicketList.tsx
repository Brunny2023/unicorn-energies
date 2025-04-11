
import React from 'react';
import { Ticket } from '@/types/investment';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';
import TicketItem from './TicketItem';

interface TicketListProps {
  loading: boolean;
  tickets: Ticket[];
  filteredTickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ loading, tickets, filteredTickets }) => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-unicorn-darkPurple/50 p-4 rounded-md animate-pulse">
                <div className="h-5 w-3/4 bg-unicorn-gold/20 rounded mb-2"></div>
                <div className="h-4 w-1/4 bg-unicorn-gold/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-8">
            <Inbox className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white">No tickets found</h3>
            <p className="text-gray-400 mt-1 mb-4">
              {tickets.length === 0 
                ? "You haven't created any support tickets yet." 
                : "No tickets match your current filters."}
            </p>
            <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
              <Link to="/dashboard/tickets/new">Create Your First Ticket</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketList;
