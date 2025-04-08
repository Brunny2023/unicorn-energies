
import { 
  Button, 
  Input, 
  Search 
} from "@/components/admin/AdminImports";

interface UserFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onRefresh: () => void;
}

const UserFilters = ({ searchTerm, onSearch, onRefresh }: UserFiltersProps) => {
  return (
    <div className="w-full sm:w-auto flex items-center gap-2">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
        />
      </div>
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

export default UserFilters;
