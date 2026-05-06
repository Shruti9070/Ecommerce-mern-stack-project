const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const SECRET = process.env.JWT_SECRET || "mysecretkey";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "Please provide all required fields ❌",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.json({ message: "User already exists ❌" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({
      message: "User registered ✅",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Please provide email and password ❌" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found ❌" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ message: "Wrong password ❌" });

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({
      message: "Login successful ✅",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

// GET CURRENT USER
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// UPDATE PROFILE
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    res.json({ message: "Profile updated ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// LOGOUT (Client-side, just clear token)
router.post("/logout", verifyToken, async (req, res) => {
  res.json({ message: "Logged out ✅" });
});

// ====== ADMIN ROUTES ======

// GET ALL USERS (ADMIN ONLY)
router.get("/admin/all-users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// GET USER BY ID (ADMIN ONLY)
router.get("/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
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
router.put("/admin/update/:id", verifyToken, verifyAdmin, async (req, res) => {
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
router.delete("/admin/delete/:id", verifyToken, verifyAdmin, async (req, res) => {
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

module.exports = router;