
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EmptyLotPage from "./pages/products/EmptyLotPage";
import SemiFinishedLotPage from "./pages/products/SemiFinishedLotPage";
import ReadyToOccupyPage from "./pages/products/ReadyToOccupyPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InformationPage from "./pages/InformationPage";
import ContentPage from "./pages/ContentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tentang",
    element: <AboutPage />,
  },
  {
    path: "/kontak",
    element: <ContactPage />,
  },
  {
    path: "/produk",
    element: <ProductsPage />,
  },
  {
    path: "/produk/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/produk/kavling-kosongan",
    element: <EmptyLotPage />,
  },
  {
    path: "/produk/kavling-setengah-jadi",
    element: <SemiFinishedLotPage />,
  },
  {
    path: "/produk/kavling-siap-huni",
    element: <ReadyToOccupyPage />,
  },
  {
    path: "/informasi",
    element: <InformationPage />,
  },
  {
    path: "/konten/:slug",
    element: <ContentPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
