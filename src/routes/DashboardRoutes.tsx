
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Dashboard pages
import Dashboard from "@/pages/dashboard/Dashboard";
import Investments from "@/pages/dashboard/Investments";
import Transactions from "@/pages/dashboard/Transactions";
import Withdraw from "@/pages/dashboard/Withdraw";
import Deposit from "@/pages/dashboard/Deposit";
import Loans from "@/pages/dashboard/Loans";
import Affiliates from "@/pages/dashboard/Affiliates";
import Settings from "@/pages/dashboard/Settings";

// Ticket pages
import TicketsIndex from "@/pages/dashboard/tickets/TicketsIndex";
import NewTicket from "@/pages/dashboard/tickets/NewTicket";
import TicketView from "@/pages/dashboard/tickets/TicketView";

const DashboardRoutes = () => (
  <>
    {/* Protected Dashboard Pages */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/investments"
      element={
        <ProtectedRoute>
          <Investments />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/transactions"
      element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/deposit"
      element={
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/withdraw"
      element={
        <ProtectedRoute>
          <Withdraw />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/loans"
      element={
        <ProtectedRoute>
          <Loans />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/affiliates"
      element={
        <ProtectedRoute>
          <Affiliates />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/tickets"
      element={
        <ProtectedRoute>
          <TicketsIndex />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/tickets/new"
      element={
        <ProtectedRoute>
          <NewTicket />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/tickets/:id"
      element={
        <ProtectedRoute>
          <TicketView />
        </ProtectedRoute>
      }
    />
  </>
);

export default DashboardRoutes;
