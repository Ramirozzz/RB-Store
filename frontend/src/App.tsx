import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import "./App.css";
import ProductPage from "./pages/ProductPage";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import Toast from "./components/Toasts/Toast";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
