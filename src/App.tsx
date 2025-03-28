
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProductsPage from "./pages/ProductsPage";
import InformationPage from "./pages/InformationPage";
import EmptyLotPage from "./pages/products/EmptyLotPage";
import SemiFinishedLotPage from "./pages/products/SemiFinishedLotPage";
import ReadyToOccupyPage from "./pages/products/ReadyToOccupyPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/daftar" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/produk" element={<ProductsPage />} />
              <Route path="/informasi" element={<InformationPage />} />
              <Route path="/produk/kavling-kosongan" element={<EmptyLotPage />} />
              <Route path="/produk/kavling-setengah-jadi" element={<SemiFinishedLotPage />} />
              <Route path="/produk/kavling-siap-huni" element={<ReadyToOccupyPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
