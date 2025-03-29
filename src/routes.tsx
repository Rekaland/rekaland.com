
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import EmptyLotPage from './pages/products/EmptyLotPage';
import SemiFinishedLotPage from './pages/products/SemiFinishedLotPage';
import ReadyToOccupyPage from './pages/products/ReadyToOccupyPage';
import InformationPage from './pages/InformationPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminPage from './pages/AdminPage';

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
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/empty-lot",
        element: <EmptyLotPage />,
      },
      {
        path: "products/semi-finished",
        element: <SemiFinishedLotPage />,
      },
      {
        path: "products/ready-to-occupy",
        element: <ReadyToOccupyPage />,
      },
      {
        path: "information",
        element: <InformationPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "settings",
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
    path: "/register",
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
]);

export default router;
