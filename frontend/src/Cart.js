import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="container">
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>
                {item.name} - ₹{item.price}
              </span>

              <button onClick={() => removeFromCart(index)}>
                Remove ❌
              </button>
            </div>
          ))}

          <h2>Total: ₹{total.toFixed(2)}</h2>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Checkout 💳
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;