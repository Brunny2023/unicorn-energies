
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TicketsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (value: string[]) => void;
  selectedPriorities: string[];
  setSelectedPriorities: (value: string[]) => void;
}

const TicketsFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatuses,
  setSelectedStatuses,
  selectedPriorities,
  setSelectedPriorities,
}: TicketsFiltersProps) => {
  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-unicorn-gold/30 text-unicorn-gold"
          >
            <Filter className="h-4 w-4 mr-2" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
          <DropdownMenuCheckboxItem
            checked={selectedStatuses.includes("open")}
            onCheckedChange={(checked) => {
              setSelectedStatuses(
                checked
                  ? [...selectedStatuses, "open"]
                  : selectedStatuses.filter((s) => s !== "open")
              );
            }}
          >
            Open
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedStatuses.includes("in_progress")}
            onCheckedChange={(checked) => {
              setSelectedStatuses(
                checked
                  ? [...selectedStatuses, "in_progress"]
                  : selectedStatuses.filter((s) => s !== "in_progress")
              );
            }}
          >
            In Progress
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedStatuses.includes("resolved")}
            onCheckedChange={(checked) => {
              setSelectedStatuses(
                checked
                  ? [...selectedStatuses, "resolved"]
                  : selectedStatuses.filter((s) => s !== "resolved")
              );
            }}
          >
            Resolved
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedStatuses.includes("closed")}
            onCheckedChange={(checked) => {
              setSelectedStatuses(
                checked
                  ? [...selectedStatuses, "closed"]
                  : selectedStatuses.filter((s) => s !== "closed")
              );
            }}
          >
            Closed
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-unicorn-gold/30 text-unicorn-gold"
          >
            <Filter className="h-4 w-4 mr-2" />
            Priority
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
          <DropdownMenuCheckboxItem
            checked={selectedPriorities.includes("high")}
            onCheckedChange={(checked) => {
              setSelectedPriorities(
                checked
                  ? [...selectedPriorities, "high"]
                  : selectedPriorities.filter((p) => p !== "high")
              );
            }}
          >
            High
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedPriorities.includes("medium")}
            onCheckedChange={(checked) => {
              setSelectedPriorities(
                checked
                  ? [...selectedPriorities, "medium"]
                  : selectedPriorities.filter((p) => p !== "medium")
              );
            }}
          >
            Medium
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedPriorities.includes("low")}
            onCheckedChange={(checked) => {
              setSelectedPriorities(
                checked
                  ? [...selectedPriorities, "low"]
                  : selectedPriorities.filter((p) => p !== "low")
              );
            }}
          >
            Low
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TicketsFilters;
