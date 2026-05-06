import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./axiosConfig";
import "./OrderSuccess.css";

function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      console.log("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading... ⏳</div>;
  }

  if (!order) {
    return <div className="error-message">Order not found ❌</div>;
  }

  return (
    <div className="order-success">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Order Successful!</h1>
        <p className="thank-you">Thank you for your purchase!</p>

        <div className="order-details">
          <div className="detail-row">
            <label>Order ID:</label>
            <span className="order-id">{order._id}</span>
          </div>

          <div className="detail-row">
            <label>Status:</label>
            <span className="status confirmed">● {order.status.toUpperCase()}</span>
          </div>

          <div className="detail-row">
            <label>Total Amount:</label>
            <span>₹{order.total.toFixed(2)}</span>
          </div>

          <div className="detail-row">
            <label>Payment Method:</label>
            <span>{order.paymentMethod}</span>
          </div>

          <div className="detail-row">
            <label>Shipping Address:</label>
            <span className="address">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city} - {order.shippingAddress.zip}
            </span>
          </div>
        </div>

        <div className="order-items">
          <h3>Items Ordered</h3>
          {order.products.map((product, idx) => (
            <div key={idx} className="item-row">
              <span>{product.name}</span>
              <span>Qty: {product.quantity}</span>
              <span>₹{product.price * product.quantity}</span>
            </div>
          ))}
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>📧 You'll receive a confirmation email shortly</li>
            <li>📦 Your order will be processed within 24 hours</li>
            <li>🚚 Track your shipment in "My Orders"</li>
            <li>❓ For questions, contact our support team</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button className="btn-continue" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button className="btn-orders" onClick={() => navigate("/my-orders")}>
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
