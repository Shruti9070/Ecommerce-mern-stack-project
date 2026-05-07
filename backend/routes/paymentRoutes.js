const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

// RAZORPAY KEY IDS (Store in .env in production)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_1DP5MMOk9V27p3";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "rn3PnnIYYiHw6Y5n3VJpMnJ8";

// CREATE ORDER (For Razorpay)
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const Razorpay = require("razorpay");

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating payment order", error: err });
  }
});

// VERIFY PAYMENT
router.post("/verify-payment", verifyToken, async (req, res) => {
  try {
    const crypto = require("crypto");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rn3PnnIYYiHw6Y5n3VJpMnJ8")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ message: "Payment verified ✅", paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ message: "Payment verification failed ❌" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error verifying payment" });
  }
});

module.exports = router;
