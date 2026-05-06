import React, { useState } from "react";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "weak";
    if (pwd.length < 8) return "medium";
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return "strong";
    return "medium";
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  const signup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Full name is required ❌");
      return;
    }

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters ❌");
      return;
    }

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

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to terms and conditions ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/users/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccess("Account created successfully! ✅ Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(res.data.message || "Signup failed ❌");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError("Email already exists. Please login instead ❌");
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
          <p>Join millions of shoppers enjoying great deals</p>
          <div className="auth-benefits">
            <div className="benefit">✓ Exclusive deals</div>
            <div className="benefit">✓ Fast checkout</div>
            <div className="benefit">✓ Secure shopping</div>
          </div>
        </div>

        <div className="auth-right">
          <form onSubmit={signup}>
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join FakeFlipkart today</p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

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
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
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
              {password && (
                <div className={`password-strength ${passwordStrength}`}>
                  Strength: <span className="strength-text">{passwordStrength.toUpperCase()}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "🔄 Creating Account..." : "Create Account"}
            </button>

            <div className="auth-link">
              Already have an account? <a href="/login">Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
