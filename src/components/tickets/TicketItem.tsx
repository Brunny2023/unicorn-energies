
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from '@/types/investment';
import { AlertCircle, Clock, Inbox } from 'lucide-react';

interface TicketItemProps {
  ticket: Ticket;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-yellow-500';
      case 'replied':
        return 'text-blue-500';
      case 'in-progress':
      case 'in_progress':
        return 'text-purple-500';
      case 'resolved':
      case 'closed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Inbox className="h-4 w-4 text-blue-500" />;
      default:
        return <Inbox className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Link to={`/dashboard/tickets/${ticket.id}`}>
      <div className="flex items-start justify-between p-4 border border-unicorn-gold/20 bg-unicorn-darkPurple/50 rounded-md hover:bg-unicorn-darkPurple/70 transition-colors cursor-pointer">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {getPriorityIcon(ticket.priority)}
          </div>
          <div>
            <h4 className="font-medium text-white">{ticket.subject}</h4>
            <p className="text-sm text-gray-400 mt-1">
              {ticket.message.length > 80 
                ? `${ticket.message.substring(0, 80)}...` 
                : ticket.message}
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-xs px-2 py-1 bg-unicorn-darkPurple/70 rounded-full">
                #{ticket.id.substring(0, 8)}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(ticket.created_at).toLocaleDateString()}
              </span>
              <span className={`text-xs capitalize ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs uppercase px-2 py-1 rounded-full border border-unicorn-gold/20 text-unicorn-gold">
          {ticket.category || 'general'}
        </span>
      </div>
    </Link>
  );
};

export default TicketItem;
