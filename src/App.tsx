
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EmailConfirmPage from './pages/EmailConfirmPage';
import { Toaster } from './components/ui/toaster';
import AdminSetupPage from "./pages/AdminSetupPage";
import AdminDashboard from './pages/AdminDashboard';
import SettingsPage from './pages/SettingsPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produk" element={<ProductsPage />} />
              <Route path="/produk/:id" element={<ProductDetailPage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/daftar" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/confirm-email" element={<EmailConfirmPage />} />
              <Route path="/admin-setup" element={<AdminSetupPage />} />
              <Route path="/auth/callback" element={<div>Loading...</div>} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
