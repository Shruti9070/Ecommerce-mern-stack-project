const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("../middleware/auth");

// GET WISHLIST
router.get("/", verifyToken, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId }).populate(
      "products"
    );

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, products: [] });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist" });
  }
});

// ADD TO WISHLIST
router.post("/add/:productId", verifyToken, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, products: [] });
    }

    if (!wishlist.products.includes(req.params.productId)) {
      wishlist.products.push(req.params.productId);
      await wishlist.save();
    }

    await wishlist.populate("products");
    res.json({ message: "Added to wishlist ✅", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
});

// REMOVE FROM WISHLIST
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found ❌" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== req.params.productId
    );

    await wishlist.save();
    await wishlist.populate("products");
    res.json({ message: "Removed from wishlist ✅", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
});

module.exports = router;
