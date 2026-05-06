const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const { products, total, shippingAddress, paymentId, paymentMethod } =
      req.body;

    const newOrder = new Order({
      userId: req.userId,
      products,
      total,
      shippingAddress,
      paymentId,
      paymentMethod: paymentMethod || "razorpay",
      status: "confirmed",
    });

    const saved = await newOrder.save();
    res.json({ message: "Order placed ✅", order: saved });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
  }
});

// GET USER ORDERS
router.get("/user/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// GET SINGLE ORDER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
});

// GET ALL ORDERS (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// UPDATE ORDER STATUS (ADMIN ONLY)
router.put("/:id/status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    res.json({ message: "Order status updated ✅", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
});

module.exports = router;
