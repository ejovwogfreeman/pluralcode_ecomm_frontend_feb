import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import "./App.css";
// import { productsData } from "./data";
import CartPage from "./pages/CartPage";
import OrderDetails from "./pages/OrderDetails";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
