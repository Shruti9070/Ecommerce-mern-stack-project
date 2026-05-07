const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// ====== ORDERS MANAGEMENT ======

// GET ALL ORDERS (ADMIN ONLY)
router.get("/orders", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});

// GET SINGLE ORDER (ADMIN ONLY)
router.get("/orders/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
});

// UPDATE ORDER STATUS (ADMIN ONLY)
router.put("/orders/:id/status", verifyToken, verifyAdmin, async (req, res) => {
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

// DELETE ORDER (ADMIN ONLY)
router.delete("/orders/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }
    res.json({ message: "Order deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

// ====== USERS MANAGEMENT ======

// GET ALL USERS (ADMIN ONLY)
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// GET USER BY ID (ADMIN ONLY)
router.get("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// UPDATE USER (ADMIN ONLY)
router.put("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json({ message: "User updated ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE USER (ADMIN ONLY)
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }
    res.json({ message: "User deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ====== PRODUCTS MANAGEMENT ======

// GET ALL PRODUCTS (ADMIN)
router.get("/products", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// GET STATISTICS (ADMIN)
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;
