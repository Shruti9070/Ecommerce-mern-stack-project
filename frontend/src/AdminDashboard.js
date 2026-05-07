import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user.role !== "admin") {
      alert("Access denied ❌");
      window.location.href = "/";
      return;
    }

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllData = async () => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users");
    }
  };

  useEffect(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalRevenue,
    });
  }, [products, orders, users]);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description || !newProduct.category) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, newProduct);
        alert("Product updated ✅");
      } else {
        await API.post("/products", newProduct);
        alert("Product added ✅");
      }
      setNewProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert(editingProduct ? "Error updating product ❌" : "Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      try {
        await API.delete(`/products/${id}`);
        alert("Product deleted ✅");
        fetchProducts();
      } catch (err) {
        alert("Error deleting product ❌");
      }
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
      alert("Order status updated ✅");
      fetchOrders();
    } catch (err) {
      alert("Error updating order ❌");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      try {
        await API.delete(`/admin/users/${id}`);
        alert("User deleted ✅");
        fetchUsers();
      } catch (err) {
        alert("Error deleting user ❌");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🎛️ Admin Dashboard</h1>
        <p>Welcome, {user.name}!</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          📦 Products
        </button>
        <button
          className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📋 Orders
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="admin-section dashboard-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>Total Products</h3>
                <p className="stat-number">{stats.totalProducts}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>Total Orders</h3>
                <p className="stat-number">{stats.totalOrders}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="recent-section">
            <div className="recent-box">
              <h3>Recent Orders</h3>
              <div className="recent-list">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="recent-item">
                    <span>Order #{order._id.slice(-6)}</span>
                    <span className={`status ${order.status}`}>₹{(order.total || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="recent-box">
              <h3>Recent Users</h3>
              <div className="recent-list">
                {users.slice(0, 5).map((u) => (
                  <div key={u._id} className="recent-item">
                    <span>{u.name}</span>
                    <span className="status-user">{u.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="admin-section">
          <h2>Product Management</h2>

          <div className="add-product-form">
            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            ></textarea>
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <div className="form-buttons">
              <button onClick={handleAddProduct} disabled={loading} className="btn-submit">
                {loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
              </button>
              {editingProduct && (
                <button 
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({ name: "", price: "", image: "", description: "", category: "" });
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="products-table">
            <h3>All Products ({products.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img src={product.image} alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.rating || 0}⭐</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="admin-section">
          <h2>Order Management</h2>

          <div className="orders-table">
            <h3>All Orders ({orders.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Email</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(0, 8)}...</td>
                    <td>{order.shippingAddress?.email || "N/A"}</td>
                    <td>₹{(order.total || 0).toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className={`status-select ${order.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-view"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="admin-section">
          <h2>User Management</h2>

          <div className="users-table">
            <h3>All Users ({users.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role === "admin" ? "👑 Admin" : "👤 User"}
                      </span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Order ID:</strong>
                <span>{selectedOrder._id}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status.toUpperCase()}</span>
              </div>
              <div className="detail-row">
                <strong>Total Amount:</strong>
                <span>₹{(selectedOrder.total || 0).toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <strong>Payment Method:</strong>
                <span>{selectedOrder.paymentMethod || "N/A"}</span>
              </div>
              <div className="detail-row">
                <strong>Payment ID:</strong>
                <span>{selectedOrder.paymentId || "N/A"}</span>
              </div>
              <div className="detail-row">
                <strong>Order Date:</strong>
                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>

              <h3 style={{ marginTop: "20px", borderBottom: "2px solid #f0f0f0", paddingBottom: "10px" }}>Shipping Address</h3>
              {selectedOrder.shippingAddress && (
                <>
                  <div className="detail-row">
                    <strong>Name:</strong>
                    <span>{selectedOrder.shippingAddress.name || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong>
                    <span>{selectedOrder.shippingAddress.email || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong>
                    <span>{selectedOrder.shippingAddress.phone || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Address:</strong>
                    <span>{selectedOrder.shippingAddress.address || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <strong>City:</strong>
                    <span>{selectedOrder.shippingAddress.city || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Postal Code:</strong>
                    <span>{selectedOrder.shippingAddress.postalCode || "N/A"}</span>
                  </div>
                </>
              )}

              <h3 style={{ marginTop: "20px", borderBottom: "2px solid #f0f0f0", paddingBottom: "10px" }}>Products Ordered</h3>
              {selectedOrder.products && selectedOrder.products.length > 0 ? (
                <div className="products-list">
                  {selectedOrder.products.map((product, idx) => (
                    <div key={idx} className="product-item">
                      <span>{product.name}</span>
                      <span>x{product.quantity}</span>
                      <span>₹{(product.price || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No products in this order</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
