import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved email if user had checked "Remember Me"
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email.trim()) {
      setError("Email is required ❌");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email ❌");
      return;
    }

    if (!password) {
      setError("Password is required ❌");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/users/login", {
        email: email.trim(),
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Save email if remember me is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setSuccess("Login successful! ✅ Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(res.data.message || "Login failed ❌");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Invalid email or password ❌");
      } else {
        setError("Network error. Please try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h1>🛍️ Privon</h1>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <div className="auth-benefits">
            <div className="benefit">✓ Personalized shopping</div>
            <div className="benefit">✓ Track your orders</div>
            <div className="benefit">✓ Save your wishlist</div>
          </div>
        </div>

        <div className="auth-right">
          <form onSubmit={login}>
            <h2>Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to your account</p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label>Password</label>
                <a href="/forgot-password" className="forgot-password">Forgot?</a>
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me for next time</label>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "🔄 Logging in..." : "Login"}
            </button>

            <div className="auth-link">
              New to Privon? <a href="/signup">Create account here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;