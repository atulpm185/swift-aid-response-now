
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create placeholder pages that will be implemented later
const ContactsPage = () => <div className="p-4">Emergency Contacts page coming soon</div>;
const GuidePage = () => <div className="p-4">Emergency Guide page coming soon</div>;
const LocationPage = () => <div className="p-4">Location Services page coming soon</div>;
const ProfilePage = () => <div className="p-4">Emergency Profile page coming soon</div>;
const ReportsPage = () => <div className="p-4">Emergency Reports page coming soon</div>;
const AlertsPage = () => <div className="p-4">Disaster Alerts page coming soon</div>;
const SettingsPage = () => <div className="p-4">Settings page coming soon</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
