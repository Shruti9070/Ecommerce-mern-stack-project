import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrderSuccess from "./OrderSuccess";
import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import Wishlist from "./Wishlist";
import MyOrders from "./MyOrders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Profile from "./Profile";
import Addresses from "./Addresses";
import Blog from "./Blog";

import "./App.css";

function App() {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
  };

  const AdminRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role === "admin" ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />
        <Route
          path="/order-success/:orderId"
          element={<ProtectedRoute element={<OrderSuccess />} />}
        />
        <Route
          path="/my-orders"
          element={<ProtectedRoute element={<MyOrders />} />}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<Wishlist />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/addresses"
          element={<ProtectedRoute element={<Addresses />} />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;