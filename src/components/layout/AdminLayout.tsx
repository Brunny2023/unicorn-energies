
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCog, LineChart, Clock, Users, Wallet, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import StarsBackground from '@/components/ui/StarsBackground';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { path: '/admin', label: 'Dashboard', icon: <LineChart className="w-5 h-5" /> },
    { path: '/admin/transactions', label: 'Transactions', icon: <Wallet className="w-5 h-5" /> },
    { path: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { path: '/admin/tickets', label: 'Support Tickets', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-unicorn-dark flex">
      <StarsBackground />
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-unicorn-darkPurple/80 border-r border-unicorn-gold/20 hidden md:flex flex-col z-10">
        <div className="p-4 border-b border-unicorn-gold/20">
          <Link to="/admin" className="flex items-center gap-2">
            <UserCog className="h-6 w-6 text-unicorn-gold" />
            <span className="text-lg font-bold text-white">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    (location.pathname === item.path || 
                     (item.path !== '/admin' && location.pathname.startsWith(item.path)))
                      ? 'bg-unicorn-gold/20 text-unicorn-gold'
                      : 'text-gray-300 hover:bg-unicorn-darkPurple/50 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-unicorn-gold/20">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-300 hover:bg-unicorn-darkPurple/50 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 max-w-full overflow-x-hidden z-10">
        {/* Mobile Header */}
        <div className="md:hidden bg-unicorn-darkPurple p-4 border-b border-unicorn-gold/20 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <UserCog className="h-6 w-6 text-unicorn-gold" />
            <span className="text-lg font-bold text-white">Admin Portal</span>
          </Link>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
