
import { CartProvider } from "./contexts/CartContext";
import { AdminSessionProvider } from "./contexts/AdminSessionContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/Index";
import MenPage from "./pages/Men";
import WomenPage from "./pages/Women";
import CollectiblesPage from "./pages/Collectibles";
import ProductDetailPage from "./pages/ProductDetail";
import ContactPage from "./pages/Contact";
import NotFoundPage from "./pages/NotFound";

import AdminLoginPage from "./pages/admin/Login";
import AdminDashboardPage from "./pages/admin/Dashboard";

const App = () => {
  return (
    <AdminSessionProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Main site routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="men" element={<MenPage />} />
              <Route path="women" element={<WomenPage />} />
              <Route path="collectibles" element={<CollectiblesPage />} />
              <Route path="product/:productId" element={<ProductDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminLoginPage />} />
              <Route path="login" element={<AdminLoginPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminSessionProvider>
  );
};

export default App;
