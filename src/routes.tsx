
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import InformationPage from './pages/InformationPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminPage from './pages/AdminPage';
import AdminSetupPage from './pages/AdminSetupPage';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "tentang",
        element: <AboutPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "produk",
        element: <ProductsPage />,
      },
      {
        path: "produk/:id",
        element: <ProductDetailPage />,
      },
      // Redirect old category paths to the main products page with a query parameter
      {
        path: "produk/kavling-kosongan",
        element: <ProductsPage />,
      },
      {
        path: "produk/kavling-setengah-jadi",
        element: <ProductsPage />,
      },
      {
        path: "produk/kavling-siap-huni",
        element: <ProductsPage />,
      },
      {
        path: "information",
        element: <InformationPage />,
      },
      {
        path: "informasi",
        element: <InformationPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "bantuan",
        element: <HelpPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profil",
        element: <ProfilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "pengaturan",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/masuk",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/daftar",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin-setup",
    element: <AdminSetupPage />,
  },
]);

export default router;
