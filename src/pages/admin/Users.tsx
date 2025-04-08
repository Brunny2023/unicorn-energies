
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import UserFilters from "@/components/admin/users/UserFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import UserRoleDialog from "@/components/admin/users/UserRoleDialog";
import CreditUserDialog from "@/components/admin/users/CreditUserDialog";
import { AdminUser, UserWallet } from "@/types/admin";

const Users = () => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
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
      
      const usersWithWallet = data as AdminUser[];
      setUsers(usersWithWallet);
      setFilteredUsers(usersWithWallet);
      
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
      const wallet = userWallets[selectedUser.id];
      
      if (!wallet) {
        throw new Error("User wallet not found");
      }
      
      const { error: walletError } = await supabase
        .from("wallets")
        .update({ 
          balance: wallet.balance + amount,
          updated_at: new Date().toISOString()
        })
        .eq("id", wallet.id);

      if (walletError) throw walletError;
      
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

  const openRoleDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleDialogOpen(true);
  };

  const openCreditDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setCreditAmount("");
    setCreditDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-white">User Management</h2>
          <UserFilters 
            searchTerm={searchTerm} 
            onSearch={setSearchTerm} 
            onRefresh={fetchUsers} 
          />
        </div>

        <UsersTable 
          users={filteredUsers}
          userWallets={userWallets}
          loading={loading}
          onEditRole={openRoleDialog}
          onCreditUser={openCreditDialog}
        />
      </div>

      <UserRoleDialog 
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        selectedUser={selectedUser}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onSave={handleRoleUpdate}
        isLoading={isUpdatingRole}
      />

      <CreditUserDialog 
        open={creditDialogOpen}
        onOpenChange={setCreditDialogOpen}
        selectedUser={selectedUser}
        userWallets={userWallets}
        creditAmount={creditAmount}
        onCreditAmountChange={setCreditAmount}
        onConfirm={handleCreditUser}
        isLoading={isProcessingCredit}
      />
    </AdminLayout>
  );
};

export default Users;
