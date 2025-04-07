import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  UserCog,
  Wallet,
  Check,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AdminRoute } from "@/components/ui/AdminRoute";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

interface UserWallet {
  id: string;
  balance: number;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");
  const [userWallets, setUserWallets] = useState<Record<string, UserWallet>>({});
  const [isProcessingCredit, setIsProcessingCredit] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      
      const usersWithWallet = data as User[];
      setUsers(usersWithWallet);
      setFilteredUsers(usersWithWallet);
      
      // Fetch wallets for all users
      await fetchAllWallets(usersWithWallet.map(user => user.id));
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllWallets = async (userIds: string[]) => {
    try {
      const { data, error } = await supabase
        .from("wallets")
        .select("id, user_id, balance")
        .in("user_id", userIds);

      if (error) throw error;

      const walletsMap: Record<string, UserWallet> = {};
      data.forEach(wallet => {
        walletsMap[wallet.user_id] = { id: wallet.id, balance: wallet.balance };
      });
      
      setUserWallets(walletsMap);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !selectedRole || isUpdatingRole) return;
    
    setIsUpdatingRole(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: selectedRole })
        .eq("id", selectedUser.id);

      if (error) throw error;
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        )
      );
      
      toast({
        title: "Role updated",
        description: `${selectedUser.email}'s role has been updated to ${selectedRole}`,
      });
      
      setRoleDialogOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role. Please try again.",
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleDialogOpen(true);
  };

  const openCreditDialog = (user: User) => {
    setSelectedUser(user);
    setCreditAmount("");
    setCreditDialogOpen(true);
  };

  const handleCreditUser = async () => {
    if (!selectedUser || !creditAmount || isProcessingCredit) return;
    
    const amount = parseFloat(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid positive number",
      });
      return;
    }
    
    setIsProcessingCredit(true);
    try {
      // Get user's wallet
      const wallet = userWallets[selectedUser.id];
      
      if (!wallet) {
        throw new Error("User wallet not found");
      }
      
      // Update wallet balance
      const { error: walletError } = await supabase
        .from("wallets")
        .update({ 
          balance: wallet.balance + amount,
          updated_at: new Date().toISOString()
        })
        .eq("id", wallet.id);

      if (walletError) throw walletError;
      
      // Create transaction record
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id: selectedUser.id,
          amount,
          type: "credit",
          status: "completed",
          description: "Admin credit",
          created_by: currentUser?.id
        });

      if (transactionError) throw transactionError;
      
      // Update local state
      setUserWallets({
        ...userWallets,
        [selectedUser.id]: {
          ...wallet,
          balance: wallet.balance + amount
        }
      });
      
      toast({
        title: "Credit successful",
        description: `$${amount.toFixed(2)} has been credited to ${selectedUser.email}'s account`,
      });
      
      setCreditDialogOpen(false);
    } catch (error) {
      console.error("Error crediting user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to credit user. Please try again.",
      });
    } finally {
      setIsProcessingCredit(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  return (
    <AdminRoute>
      <DashboardLayout isAdmin>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-3xl font-bold text-white">User Management</h2>
            <div className="w-full sm:w-auto flex items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
              <Button
                variant="outline"
                className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
                onClick={fetchUsers}
              >
                Refresh
              </Button>
            </div>
          </div>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-gray-300">
                  <thead className="bg-unicorn-darkPurple/50 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">User</th>
                      <th className="px-4 py-3 text-left">Role</th>
                      <th className="px-4 py-3 text-right">Balance</th>
                      <th className="px-4 py-3 text-left">Joined</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-unicorn-gold/20">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-4 py-4">
                            <div className="h-4 bg-gray-700/50 rounded w-40"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 bg-gray-700/50 rounded w-16"></div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="h-4 bg-gray-700/50 rounded ml-auto w-20"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 bg-gray-700/50 rounded w-24"></div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="h-8 bg-gray-700/50 rounded w-20 ml-auto"></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-unicorn-darkPurple/30">
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-white">
                                {user.full_name || "No Name"}
                              </div>
                              <div className="text-xs text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-900/30 text-purple-400"
                                  : "bg-blue-900/30 text-blue-400"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            ${userWallets[user.id]?.balance.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-4 py-4 text-xs">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-300 hover:text-unicorn-gold"
                                onClick={() => openRoleDialog(user)}
                              >
                                <span className="sr-only">Edit Role</span>
                                <UserCog className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-300 hover:text-unicorn-gold"
                                onClick={() => openCreditDialog(user)}
                              >
                                <span className="sr-only">Credit User</span>
                                <Wallet className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Update Dialog */}
        <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
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
                  onValueChange={setSelectedRole}
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
                onClick={() => setRoleDialogOpen(false)}
                className="text-gray-300 hover:text-gray-100 hover:bg-unicorn-darkPurple/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRoleUpdate}
                disabled={isUpdatingRole}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              >
                {isUpdatingRole ? (
                  <div className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Credit User Dialog */}
        <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
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
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setCreditDialogOpen(false)}
                className="text-gray-300 hover:text-gray-100 hover:bg-unicorn-darkPurple/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreditUser}
                disabled={isProcessingCredit || !creditAmount}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              >
                {isProcessingCredit ? (
                  <div className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
                ) : (
                  <Wallet className="h-4 w-4 mr-2" />
                )}
                Credit Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default AdminUsers;
