import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import AdminDashboard from './pages/admin-dashboard';
import AccountSettings from './pages/account-settings';
import HeadshotGeneration from './pages/headshot-generation';
import Dashboard from './pages/dashboard';
import SubscriptionManagement from './pages/subscription-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountSettings />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/headshot-generation" element={<HeadshotGeneration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscription-management" element={<SubscriptionManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
