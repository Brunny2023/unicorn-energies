
import React from "react";
import { Routes, Route } from "react-router-dom";
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
  <Routes>
    {/* Protected Dashboard Pages */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/investments"
      element={
        <ProtectedRoute>
          <Investments />
        </ProtectedRoute>
      }
    />
    <Route
      path="/transactions"
      element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deposit"
      element={
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/withdraw"
      element={
        <ProtectedRoute>
          <Withdraw />
        </ProtectedRoute>
      }
    />
    <Route
      path="/loans"
      element={
        <ProtectedRoute>
          <Loans />
        </ProtectedRoute>
      }
    />
    <Route
      path="/affiliates"
      element={
        <ProtectedRoute>
          <Affiliates />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tickets"
      element={
        <ProtectedRoute>
          <TicketsIndex />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tickets/new"
      element={
        <ProtectedRoute>
          <NewTicket />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tickets/:id"
      element={
        <ProtectedRoute>
          <TicketView />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default DashboardRoutes;
