import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
