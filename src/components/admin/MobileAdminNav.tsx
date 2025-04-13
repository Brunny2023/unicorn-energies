
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  LineChart, 
  Users, 
  Wallet, 
  Ticket, 
  CreditCard,
  Clock,
  MessageCircle
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const adminRoutes = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LineChart },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/transactions', label: 'Transactions', icon: Wallet },
  { path: '/admin/tickets', label: 'Support Tickets', icon: Ticket },
  { path: '/admin/payment-connections', label: 'Payment Connections', icon: CreditCard },
  { path: '/admin/loan-applications', label: 'Loan Applications', icon: Clock },
  { path: '/admin/broadcast', label: 'Broadcast Messages', icon: MessageCircle },
  { path: '/admin/settings', label: 'Settings', icon: CreditCard },
];

const MobileAdminNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current route
  const currentPath = location.pathname;
  
  // Find the matching route object
  const currentRoute = adminRoutes.find(route => 
    currentPath === route.path || 
    (currentPath.startsWith(route.path) && route.path !== '/admin/dashboard')
  ) || adminRoutes[0];

  const handleRouteChange = (value: string) => {
    navigate(value);
  };

  return (
    <div className="md:hidden w-full bg-unicorn-darkPurple/90 p-4 border-b border-unicorn-gold/20">
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin" className="text-unicorn-gold">
              Admin
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">{currentRoute.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Select value={currentPath} onValueChange={handleRouteChange}>
        <SelectTrigger className="w-full bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
          <SelectValue placeholder="Navigate to..." />
        </SelectTrigger>
        <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
          {adminRoutes.map((route) => (
            <SelectItem 
              key={route.path} 
              value={route.path}
              className="text-white hover:bg-unicorn-gold/20 focus:bg-unicorn-gold/20"
            >
              <div className="flex items-center">
                <route.icon className="mr-2 h-4 w-4 text-unicorn-gold" />
                {route.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileAdminNav;
