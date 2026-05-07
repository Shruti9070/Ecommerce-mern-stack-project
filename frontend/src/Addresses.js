import React, { useState, useEffect } from "react";
import "./Addresses.css";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("userAddresses") || "[]");
    setAddresses(savedAddresses);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddAddress = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("❌ Please fill all fields");
      return;
    }

    let updatedAddresses;
    if (editingId) {
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingId ? { ...formData, id: editingId } : addr
      );
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
      };
      updatedAddresses = [...addresses, newAddress];
    }

    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    setFormData({
      label: "",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  return (
    <div className="addresses-container">
      <div className="addresses-header">
        <h1>📍 My Addresses</h1>
        <button className="btn-add-address" onClick={() => setShowForm(!showForm)}>
          {showForm ? "❌ Cancel" : "➕ Add New Address"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="address-form-section">
          <h2>{editingId ? "Edit Address" : "Add New Address"}</h2>
          <div className="address-form">
            <div className="form-row">
              <div className="form-group">
                <label>Address Label (e.g., Home, Office)</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  placeholder="Home"
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91-XXXXX-XXXXX"
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="201301"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street, Apartment 4B"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Noida"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Uttar Pradesh"
                />
              </div>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              <label>Set as default address</label>
            </div>

            <button className="btn-save-address" onClick={handleAddAddress}>
              {editingId ? "💾 Update Address" : "➕ Save Address"}
            </button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 && !showForm ? (
        <div className="no-addresses">
          <p>📭 No addresses saved yet. Add your first address!</p>
        </div>
      ) : (
        <div className="addresses-list">
          {addresses.map((address) => (
            <div key={address.id} className={`address-card ${address.isDefault ? "default" : ""}`}>
              {address.isDefault && <div className="default-badge">⭐ Default</div>}
              <div className="address-content">
                <h3>{address.label || "Address"}</h3>
                <p><strong>Name:</strong> {address.fullName}</p>
                <p><strong>Phone:</strong> {address.phone}</p>
                <p><strong>Address:</strong> {address.address}</p>
                <p><strong>City:</strong> {address.city}, {address.state} {address.pincode}</p>
              </div>
              <div className="address-actions">
                <button className="btn-edit" onClick={() => handleEditAddress(address)}>
                  ✏️ Edit
                </button>
                {!address.isDefault && (
                  <button className="btn-default" onClick={() => handleSetDefault(address.id)}>
                    ⭐ Set Default
                  </button>
                )}
                <button className="btn-delete" onClick={() => handleDeleteAddress(address.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
