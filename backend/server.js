const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigin ? allowedOrigin : true,
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes"); // Blog routes for n8n AI content publishing

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
console.log("✅ Blog routes loaded at /api/blogs");

// TEST ROUTE - REMOVE AFTER TESTING
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working!", timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "build");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      return res.sendFile(path.join(frontendBuildPath, "index.html"));
    }
    return res.status(404).json({ message: "API route not found" });
  });
}

// DB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});