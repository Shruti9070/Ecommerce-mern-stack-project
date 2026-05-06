import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./axiosConfig";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    updateCartCount();
    updateWishlistCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const updateWishlistCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await API.get("/wishlist");
        setWishlistCount(res.data.products.length);
      }
    } catch (err) {
      console.log("Error fetching wishlist count");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out ✅");
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">Privon</span>
          </a>
        </div>

        {/* Search */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for products..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(`/?search=${e.target.value}`);
              }
            }}
          />
          <button>🔍</button>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="/about" className="nav-link">
            ℹ️ About
          </a>

          <a href="/contact" className="nav-link">
            📞 Contact
          </a>

          {user ? (
            <>
              <div className="user-info">
                <span>👤 {user.name}</span>
                {user.role === "admin" && (
                  <a href="/admin" className="admin-badge">
                    Admin Panel
                  </a>
                )}
              </div>

              <a href="/profile" className="nav-link">
                👤 Profile
              </a>

              <a href="/my-orders" className="nav-link">
                📦 Orders
              </a>

              <a href="/wishlist" className="nav-link wishlist-link">
                ❤️ Wishlist ({wishlistCount})
              </a>

              <a href="/cart" className="nav-link cart-link">
                🛒 Cart ({cartCount})
              </a>

              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link">
                Login
              </a>
              <a href="/signup" className="nav-link">
                Sign Up
              </a>
              <a href="/cart" className="nav-link cart-link">
                🛒 Cart ({cartCount})
              </a>
            </>
          )}

          <button onClick={toggleDarkMode} className="btn-dark-mode">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
