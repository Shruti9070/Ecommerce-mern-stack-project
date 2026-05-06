import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./axiosConfig";
import "./Checkout.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shippingAddress, setShippingAddress] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const initiateStripePayment = async () => {
    try {
      setLoading(true);

      // Simulate Stripe payment with popup confirmation
      const paymentConfirmed = await new Promise((resolve) => {
        const confirmed = window.confirm(
          "💳 Stripe Dummy Payment\n\nTest Card Details:\nCard: 4242 4242 4242 4242\nExpiry: 12/34\nCVC: 123\n\nClick OK to complete payment"
        );
        resolve(confirmed);
      });

      if (!paymentConfirmed) {
        setLoading(false);
        alert("Payment cancelled ❌");
        return;
      }

      // Generate dummy Stripe payment ID
      const dummyPaymentId = `pi_${Math.random().toString(36).substr(2, 20)}`;

      // Create order in database
      const orderData = {
        products: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shippingAddress,
        paymentId: dummyPaymentId,
        paymentMethod: "stripe",
      };

      const createOrderRes = await API.post("/orders", orderData);

      // Clear cart and redirect
      localStorage.removeItem("cart");
      setCart([]);
      navigate(`/order-success/${createOrderRes.data.order._id}`);
    } catch (error) {
      setLoading(false);
      alert("Stripe payment failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      setLoading(true);

      // Create Razorpay order
      const orderRes = await API.post("/payments/create-order", {
        amount: total,
      });

      const razorpayOrder = orderRes.data;

      // Razorpay payment options
      const options = {
        key: "rzp_test_1DP5MMOk9V27p3",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyRes = await API.post("/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.paymentId) {
              // Create order in DB
              const orderData = {
                products: cart.map((item) => ({
                  productId: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
                total,
                shippingAddress,
                paymentId: verifyRes.data.paymentId,
                paymentMethod: "razorpay",
              };

              const createOrderRes = await API.post("/orders", orderData);

              // Clear cart and redirect
              localStorage.removeItem("cart");
              setCart([]);
              navigate(`/order-success/${createOrderRes.data.order._id}`);
            }
          } catch (err) {
            alert("Payment verification failed ❌");
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
      };

      const Razorpay = window.Razorpay;
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Failed to initiate payment ❌");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.phone || !shippingAddress.address) {
      alert("Please fill all address fields ❌");
      return;
    }

    if (paymentMethod === "razorpay") {
      initiateRazorpayPayment();
    } else if (paymentMethod === "stripe") {
      initiateStripePayment();
    } else {
      alert("Payment method not available ❌");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Shipping Address */}
        <div className="checkout-section">
          <h2>Shipping Address</h2>
          <form className="address-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingAddress.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={shippingAddress.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={shippingAddress.phone}
              onChange={handleInputChange}
            />
            <textarea
              name="address"
              placeholder="Street Address"
              value={shippingAddress.address}
              onChange={handleInputChange}
            ></textarea>
            <div className="address-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={shippingAddress.zip}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        {/* Payment Method */}
        <div className="checkout-section">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💳 Razorpay (Cards, UPI, Wallets)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💰 Stripe (Test Mode)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled
              />
              📦 Cash on Delivery (Coming Soon)
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-items">
          {cart.map((item) => (
            <div key={item._id} className="summary-item">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>₹0</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="btn-place-order"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
