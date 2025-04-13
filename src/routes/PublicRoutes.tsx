
import React from "react";
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import InvestmentPlans from "@/pages/InvestmentPlans";
import Calculator from "@/pages/Calculator";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import HowItWorks from "@/pages/HowItWorks";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

const PublicRoutes = () => (
  <>
    {/* Public Pages */}
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/investment-plans" element={<InvestmentPlans />} />
    <Route path="/calculator" element={<Calculator />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />

    {/* Auth Pages */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
  </>
);

export default PublicRoutes;
