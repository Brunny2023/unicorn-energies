
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-gray-400" />
            <span>Status: {statusFilter === "all" ? "All" : statusFilter}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/20">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="replied">Replied</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="bg-unicorn-darkPurple/40 border-unicorn-gold/20 text-white">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-gray-400" />
            <span>Priority: {priorityFilter === "all" ? "All" : priorityFilter}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/20">
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TicketFilters;
