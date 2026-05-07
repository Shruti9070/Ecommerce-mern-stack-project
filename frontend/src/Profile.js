import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData || !userData.id) {
      navigate("/login");
    } else {
      setUser(userData);
      setFormData(userData);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateProfile = () => {
    if (formData.name.length < 3) {
      setMessage("❌ Name must be at least 3 characters");
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ Passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }
    setMessage("✅ Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordForm(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>👤 My Profile</h1>

        {message && <div className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</div>}

        {/* Profile Section */}
        <div className="profile-section">
          <h2>Account Information</h2>
          {editMode ? (
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  disabled
                  value={formData.email || ""}
                  placeholder="Email cannot be changed"
                />
              </div>
              <div className="profile-actions">
                <button className="btn-save" onClick={handleUpdateProfile}>
                  💾 Save Changes
                </button>
                <button className="btn-cancel" onClick={() => setEditMode(false)}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-display">
              <div className="profile-field">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="profile-field">
                <label>Member Since:</label>
                <span>April 2026</span>
              </div>
              <button className="btn-edit" onClick={() => setEditMode(true)}>
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="profile-section">
          <h2>Security Settings</h2>
          {showPasswordForm ? (
            <div className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 chars)"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="password-actions">
                <button className="btn-save" onClick={handleChangePassword}>
                  🔒 Change Password
                </button>
                <button className="btn-cancel" onClick={() => setShowPasswordForm(false)}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className="btn-security" onClick={() => setShowPasswordForm(true)}>
                🔑 Change Password
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-icon">📦</span>
            <div>
              <p className="stat-value">3</p>
              <p className="stat-label">Orders</p>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">❤️</span>
            <div>
              <p className="stat-value">5</p>
              <p className="stat-label">Wishlist Items</p>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">⭐</span>
            <div>
              <p className="stat-value">2</p>
              <p className="stat-label">Reviews</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions-footer">
          <button className="btn-addresses" onClick={() => navigate("/addresses")}>
            📍 Manage Addresses
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
