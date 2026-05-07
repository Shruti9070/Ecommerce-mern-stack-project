import React, { useState } from "react";

function Checkout({ cart }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + shippingCost;

  // Mock discount codes
  const validCodes = {
    "PRIVON10": 0.10,  // 10% off
    "PRIVON20": 0.20,  // 20% off
    "SAVE50": 50,      // ₹50 off
  };

  const handleApplyDiscount = () => {
    if (!discountCode) {
      alert("Enter a discount code");
      return;
    }
    
    if (validCodes[discountCode.toUpperCase()]) {
      const code = discountCode.toUpperCase();
      let discount = validCodes[code];
      
      if (discount < 1) {
        discount = subtotal * discount;  // Percentage
      }
      
      setDiscountAmount(discount);
      setDiscountApplied(true);
      alert(`✅ Discount applied! You saved ₹${discount.toFixed(2)}`);
    } else {
      alert("❌ Invalid discount code");
    }
  };

  const handlePayment = () => {
    alert(`Payment successful via ${paymentMethod.toUpperCase()} 🎉`);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>🛒 Checkout</h1>

      {/* ADDRESS */}
      <div style={box}>
        <h3>📍 Delivery Address</h3>
        <input placeholder="Full Name" style={input} />
        <input placeholder="Phone Number" style={input} />
        <input placeholder="Address" style={input} />
        <input placeholder="City" style={input} />
      </div>

      {/* ORDER SUMMARY */}
      <div style={box}>
        <h3>🧾 Order Summary</h3>

        {cart.map((item, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            {item.name} - ₹{item.price}
          </div>
        ))}

        <hr />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <strong>Subtotal:</strong>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        {discountApplied && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "green" }}>
            <strong>Discount:</strong>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <strong>Shipping:</strong>
          <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
        </div>

        <hr />

        <h2 style={{ marginTop: "10px" }}>Total: ₹{total.toFixed(2)}</h2>
      </div>

      {/* DISCOUNT CODE */}
      <div style={box}>
        <h3>🎁 Discount Code</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Enter discount code (PRIVON10, PRIVON20, SAVE50)"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={discountApplied}
            style={input}
          />
          <button
            onClick={handleApplyDiscount}
            disabled={discountApplied}
            style={{
              padding: "10px 20px",
              background: discountApplied ? "#ccc" : "#2874f0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: discountApplied ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {discountApplied ? "✅ Applied" : "Apply"}
          </button>
        </div>
        {discountApplied && (
          <p style={{ color: "green", fontSize: "12px", margin: "8px 0 0 0" }}>
            ✅ Discount code applied successfully!
          </p>
        )}
      </div>

      {/* PAYMENT OPTIONS */}
      <div style={box}>
        <h3>💳 Payment Options</h3>

        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit / Credit Card
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI (Google Pay / PhonePe)
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        {/* CONDITIONAL UI */}
        {paymentMethod === "card" && (
          <div style={{ marginTop: "10px" }}>
            <input placeholder="Card Number" style={input} />
            <input placeholder="Expiry" style={input} />
            <input placeholder="CVV" style={input} />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div style={{ marginTop: "10px" }}>
            <input placeholder="Enter UPI ID (example@upi)" style={input} />
          </div>
        )}

        {paymentMethod === "cod" && (
          <p style={{ marginTop: "10px", color: "green" }}>
            Pay when order arrives 🚚
          </p>
        )}
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={handlePayment}
        style={{
          background: "#fb641b",
          color: "#fff",
          padding: "15px",
          width: "100%",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

// styles
const box = {
  border: "1px solid #ddd",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "5px",
  background: "#fff",
};

const input = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

export default Checkout;