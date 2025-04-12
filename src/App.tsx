
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import InvestmentPlans from "./pages/InvestmentPlans";
import Calculator from "./pages/Calculator";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Investments from "./pages/dashboard/Investments";
import Withdraw from "./pages/dashboard/Withdraw";
import Transactions from "./pages/dashboard/Transactions";
import TicketsIndex from "./pages/dashboard/tickets/TicketsIndex";
import NewTicket from "./pages/dashboard/tickets/NewTicket";
import TicketView from "./pages/dashboard/tickets/TicketView";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTransactions from "./pages/admin/Transactions";
import AdminTickets from "./pages/admin/Tickets";
import AdminTicketDetails from "./pages/admin/TicketDetails";
import PaymentConnections from "./pages/admin/PaymentConnections";
import BroadcastMessages from "./pages/admin/BroadcastMessages";

// Utility for console error filtering
import "./utils/consoleErrorFilter";

// Define the Turnstile interface globally without declaring it in the window interface
// This avoids the conflicting declarations
interface TurnstileInterface {
  render: (container: string | HTMLElement, params: any) => string;
  reset: (widgetId: string) => void;
}

// Add the global type declaration without modifying window
declare global {
  var turnstile: TurnstileInterface;
}

const App = () => {
  return (
    <div className="relative">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/investment-plans" element={<InvestmentPlans />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dashboard Routes - Updated to use nested routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="investments" element={<Investments />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="tickets" element={<TicketsIndex />} />
            <Route path="tickets/new" element={<NewTicket />} />
            <Route path="tickets/:id" element={<TicketView />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Outlet /></AdminRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="tickets/:id" element={<AdminTicketDetails />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="payment-connections" element={<PaymentConnections />} />
            <Route path="broadcast" element={<BroadcastMessages />} />
          </Route>

          {/* Catch All */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </div>
  );
};

export default App;
