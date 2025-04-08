
import { useState } from "react";
import { 
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Search,
  Filter
} from "@/components/admin/AdminImports";

interface TransactionFiltersProps {
  onSearch: (term: string) => void;
  onFilterTypes: (types: string[]) => void;
  onFilterStatuses: (statuses: string[]) => void;
  onSort: (order: string) => void;
  onRefresh: () => void;
  searchTerm: string;
  selectedTypes: string[];
  selectedStatuses: string[];
  sortOrder: string;
  transactionTypes: string[];
  transactionStatuses: string[];
}

const TransactionFilters = ({
  onSearch,
  onFilterTypes,
  onFilterStatuses,
  onSort,
  onRefresh,
  searchTerm,
  selectedTypes,
  selectedStatuses,
  sortOrder,
  transactionTypes,
  transactionStatuses
}: TransactionFiltersProps) => {
  return (
    <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-unicorn-gold/30 text-unicorn-gold">
            <Filter className="h-4 w-4 mr-2" />
            Type
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
          {transactionTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={selectedTypes.includes(type)}
              onCheckedChange={(checked) => {
                onFilterTypes(
                  checked
                    ? [...selectedTypes, type]
                    : selectedTypes.filter((t) => t !== type)
                );
              }}
              className="capitalize"
            >
              {type}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-unicorn-gold/30 text-unicorn-gold">
            <Filter className="h-4 w-4 mr-2" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
          {transactionStatuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={(checked) => {
                onFilterStatuses(
                  checked
                    ? [...selectedStatuses, status]
                    : selectedStatuses.filter((s) => s !== status)
                );
              }}
              className="capitalize"
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Select value={sortOrder} onValueChange={onSort}>
        <SelectTrigger className="w-[120px] bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
          <SelectItem value="desc">Newest first</SelectItem>
          <SelectItem value="asc">Oldest first</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </div>
  );
};

export default TransactionFilters;
