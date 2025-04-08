
import { 
  Button, 
  Card, 
  CardContent, 
  UserCog, 
  Wallet 
} from "@/components/admin/AdminImports";
import { AdminUser, UserWallet } from "@/types/admin";

interface UsersTableProps {
  users: AdminUser[];
  userWallets: Record<string, UserWallet>;
  loading: boolean;
  onEditRole: (user: AdminUser) => void;
  onCreditUser: (user: AdminUser) => void;
}

const UsersTable = ({ users, userWallets, loading, onEditRole, onCreditUser }: UsersTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  return (
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
              ) : users.length > 0 ? (
                users.map((user) => (
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
                          onClick={() => onEditRole(user)}
                        >
                          <span className="sr-only">Edit Role</span>
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-300 hover:text-unicorn-gold"
                          onClick={() => onCreditUser(user)}
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
  );
};

export default UsersTable;
