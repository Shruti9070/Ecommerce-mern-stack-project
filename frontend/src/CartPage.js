import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  };

  const calculateTotal = () => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (!user._id) {
      alert("Please login to checkout ❌");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    navigate("/checkout");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Start shopping to add items to your cart</p>
          <a href="/" className="btn-continue">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
              </div>

              <div className="quantity-control">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                />
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="btn-remove"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items):</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>₹0 (Free)</span>
          </div>
          <div className="summary-row discount">
            <span>Discount:</span>
            <span>₹0</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="btn-continue-shopping" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button className="btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
