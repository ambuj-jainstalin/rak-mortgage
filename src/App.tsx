import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AECBLoader from "./pages/AECBLoader";
import Application from "./pages/Application";
import KYC from "./pages/KYC";
import PropertySelection from "./pages/PropertySelection";
import PropertyValue from "./pages/PropertyValue";
import Submit from "./pages/Submit";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApplicationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aecb-loader" element={<AECBLoader />} />
            <Route path="/application" element={<Application />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/property-selection" element={<PropertySelection />} />
            <Route path="/property-value" element={<PropertyValue />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/offer" element={<Offer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ApplicationProvider>
  </QueryClientProvider>
);

export default App;
