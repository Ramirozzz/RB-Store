import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import Toast from "./components/Toasts/Toast";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/ProductsPage";
import GlobalSpinner from "./components/LoadingSpinners/GlobalSpinner";
import BestSellersPage from "./pages/BestSellersPage";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminLayout from "./admin/components/layout/AdminLayout";
import AdminProductsPage from "./admin/pages/AdminProductsPage";
import AdminCreateProductPage from "./admin/pages/AdminCreateProductPage";
import AdminCategoriesPage from "./admin/pages/AdminCategoriesPage";
import AdminEditProductPage from "./admin/pages/AdminEditProductPage";
import AdminOrdersPage from "./admin/pages/AdminOrdersPage";
import AdminUsersPage from "./admin/pages/AdminUsersPage";
import AdminOnlyRoute from "./components/auth/AdminOnlyRoute";
import ScrollToTop from "./components/layout/ScrollToTop";

import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <GlobalSpinner />
      <Toast />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminUsersPage />} />
          </Route>
        </Route>
        <Route element={<AdminOnlyRoute />}>
          <Route
            path="products/new-product"
            element={<AdminCreateProductPage />}
          />
          <Route path="products/:id/edit" element={<AdminEditProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
