import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders/user/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#27ae60";
      case "shipped":
        return "#3498db";
      case "delivered":
        return "#2ecc71";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#f39c12";
    }
  };

  if (loading) {
    return <div className="loading">Loading orders... ⏳</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders-container">
        <div className="empty-orders">
          <h2>No orders yet 📦</h2>
          <p>Start shopping to place your first order</p>
          <a href="/" className="btn-continue">
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>

      {selectedOrder ? (
        <div className="order-details-view">
          <button
            className="btn-back"
            onClick={() => setSelectedOrder(null)}
          >
            ← Back to Orders
          </button>

          <div className="order-detail-card">
            <div className="detail-header">
              <h2>Order #{selectedOrder._id.substring(0, 8)}</h2>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
              >
                {selectedOrder.status.toUpperCase()}
              </span>
            </div>

            <div className="detail-section">
              <h3>Order Details</h3>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{selectedOrder.total.toFixed(2)}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {selectedOrder.paymentMethod}
              </p>
            </div>

            <div className="detail-section">
              <h3>Items Ordered</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>₹{product.price}</td>
                      <td>
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="detail-section">
              <h3>Shipping Address</h3>
              <p>{selectedOrder.shippingAddress.name}</p>
              <p>{selectedOrder.shippingAddress.address}</p>
              <p>
                {selectedOrder.shippingAddress.city} -{" "}
                {selectedOrder.shippingAddress.zip}
              </p>
              <p>📧 {selectedOrder.shippingAddress.email}</p>
              <p>📱 {selectedOrder.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order._id.substring(0, 8)}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-body">
                <div className="order-info">
                  <p>
                    <strong>Items:</strong> {order.products.length} product(s)
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="order-footer">
                <button
                  className="btn-view-details"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
