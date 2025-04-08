
import { 
  Button, 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  Input, 
  Label, 
  Wallet 
} from "@/components/admin/AdminImports";
import { AdminUser, UserWallet } from "@/types/admin";

interface CreditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: AdminUser | null;
  userWallets: Record<string, UserWallet>;
  creditAmount: string;
  onCreditAmountChange: (amount: string) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CreditUserDialog = ({
  open,
  onOpenChange,
  selectedUser,
  userWallets,
  creditAmount,
  onCreditAmountChange,
  onConfirm,
  isLoading
}: CreditUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
        <DialogHeader>
          <DialogTitle>Credit User Account</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add funds to {selectedUser?.email}'s account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">Current Balance</Label>
            <div className="text-xl font-bold text-unicorn-gold">
              ${userWallets[selectedUser?.id || '']?.balance.toFixed(2) || '0.00'}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">Amount to Credit ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={creditAmount}
              onChange={(e) => onCreditAmountChange(e.target.value)}
              placeholder="Enter amount..."
              className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white"
            />
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
            onClick={onConfirm}
            disabled={isLoading || !creditAmount}
            className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
            ) : (
              <Wallet className="h-4 w-4 mr-2" />
            )}
            Credit Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreditUserDialog;
