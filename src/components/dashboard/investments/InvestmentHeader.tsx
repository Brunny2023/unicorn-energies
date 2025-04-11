
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InvestmentHeaderProps {
  sortOrder: 'newest' | 'oldest' | 'amount-high' | 'amount-low';
  setSortOrder: (order: 'newest' | 'oldest' | 'amount-high' | 'amount-low') => void;
}

const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold text-white">Investment Portfolio</h2>
        <p className="text-gray-400 mt-1">
          Manage your active investments and track returns
        </p>
      </div>
      
      <div className="mt-4 md:mt-0 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10">
              <Filter className="mr-2 h-4 w-4" />
              Sort
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
            <DropdownMenuLabel>Sort Investments</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-unicorn-gold/20" />
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOrder === 'newest' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOrder === 'oldest' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOrder === 'amount-high' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
              onClick={() => setSortOrder('amount-high')}
            >
              Highest Amount
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOrder === 'amount-low' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
              onClick={() => setSortOrder('amount-low')}
            >
              Lowest Amount
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link to="/investment-plans">
          <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Investment
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InvestmentHeader;
