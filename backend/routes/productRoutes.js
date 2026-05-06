const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// GET ALL PRODUCTS WITH FILTERS
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    let sortObj = {};
    if (sort === "low-to-high") sortObj.price = 1;
    else if (sort === "high-to-low") sortObj.price = -1;
    else if (sort === "newest") sortObj.createdAt = -1;
    else if (sort === "rating") sortObj.rating = -1;

    const products = await Product.find(filter).sort(sortObj);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// GET ALL CATEGORIES
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// CREATE PRODUCT (ADMIN ONLY)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, price, image, images, description, category, specifications } =
      req.body;

    if (!name || !price || !image || !description || !category) {
      return res.json({ message: "Please provide all required fields ❌" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      images: images || [image],
      description,
      category,
      specifications: specifications || {},
      createdBy: req.userId,
    });

    const saved = await newProduct.save();
    res.json({ message: "Product created ✅", product: saved });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err });
  }
});

// UPDATE PRODUCT (ADMIN ONLY)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Product not found ❌" });
    }
    res.json({ message: "Product updated ✅", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE PRODUCT (ADMIN ONLY)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found ❌" });
    }
    res.json({ message: "Product deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// ADD REVIEW
router.post("/:id/reviews", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const User = require("../models/User");
    const user = await User.findById(req.userId);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    product.reviews.push({
      userId: req.userId,
      userName: user.name,
      rating,
      comment,
    });

    // Update average rating
    const avgRating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length;
    product.rating = avgRating;

    await product.save();
    res.json({ message: "Review added ✅", product });
  } catch (err) {
    res.status(500).json({ message: "Error adding review" });
  }
});

module.exports = router;