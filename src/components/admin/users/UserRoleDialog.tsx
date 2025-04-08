
import { 
  Button, 
  Check,
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  Label, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/admin/AdminImports";
import { AdminUser } from "@/types/admin";

interface UserRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: AdminUser | null;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const UserRoleDialog = ({
  open,
  onOpenChange,
  selectedUser,
  selectedRole,
  onRoleChange,
  onSave,
  isLoading
}: UserRoleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
          <DialogDescription className="text-gray-400">
            Change the role for {selectedUser?.email}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">Role</Label>
            <Select
              value={selectedRole}
              onValueChange={onRoleChange}
            >
              <SelectTrigger id="role" className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-300 hover:text-gray-100 hover:bg-unicorn-darkPurple/50"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isLoading}
            className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleDialog;
