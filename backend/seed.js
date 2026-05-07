/**
 * Privon - Database Seed File
 * 
 * This file contains sample data for products, users, and initial setup.
 * Run this file ONCE during initial setup to populate the database with demo data.
 * 
 * Usage:
 * 1. Ensure MongoDB is running and .env variables are set
 * 2. Run: node seed.js
 * 3. Check console for success/error messages
 * 4. Verify data in MongoDB Atlas or local MongoDB
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("./models/User");
const Product = require("./models/Product");

// Sample Products Data
const sampleProducts = [
  {
    name: "Samsung 65\" 4K Ultra HD Smart TV",
    price: 45999,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    images: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500",
    ],
    description:
      "Premium 65-inch 4K Smart TV with HDR support and smart features. Crystal clear display with vibrant colors.",
    category: "Electronics",
    specifications: {
      brand: "Samsung",
      model: "QN65Q80A",
      warranty: "2 Years",
      color: ["Black"],
      size: ["65 inch"],
    },
    stock: 15,
  },
  {
    name: "Samsung Galaxy S23",
    price: 74999,
    image: "https://images.unsplash.com/photo-1610945413120-be5deb5ee039?w=500",
    images: [
      "https://images.unsplash.com/photo-1610945413120-be5deb5ee039?w=500",
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500",
    ],
    description:
      "Flagship Android phone with Snapdragon 8 Gen 2, 50MP camera, 120Hz display, and all-day battery.",
    category: "Electronics",
    specifications: {
      brand: "Samsung",
      model: "Galaxy S23",
      warranty: "1 Year",
      color: ["Phantom Black", "Cream", "Green", "Lavender"],
      storage: ["128GB", "256GB"],
    },
    stock: 18,
  },
  {
    name: "Apple iPhone 14",
    price: 69999,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
    ],
    description:
      "Latest iPhone 14 with A15 Bionic chip, 12MP camera system, and all-day battery life.",
    category: "Electronics",
    specifications: {
      brand: "Apple",
      model: "iPhone 14",
      warranty: "1 Year",
      color: ["Midnight", "Starlight", "Blue", "Purple", "Red"],
      storage: ["128GB", "256GB", "512GB"],
    },
    stock: 15,
  },
  {
    name: "Apple iPhone 15 Pro Max",
    price: 139999,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
    ],
    description:
      "Latest iPhone 15 Pro Max with A17 Pro chip, 48MP camera, and titanium design.",
    category: "Electronics",
    specifications: {
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      warranty: "1 Year",
      color: ["Black", "Silver", "Gold"],
      size: ["256GB", "512GB", "1TB"],
    },
    stock: 20,
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 29990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
    category: "Electronics",
    specifications: {
      brand: "Sony",
      model: "WH-1000XM5",
      warranty: "1 Year",
      color: ["Black", "Silver"],
      size: ["One Size"],
    },
    stock: 30,
  },
  {
    name: "Dell XPS 13 Laptop",
    price: 94999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    ],
    description:
      "Ultra-portable 13-inch FHD+ laptop with Intel Core i7, 16GB RAM, and 512GB SSD.",
    category: "Computers",
    specifications: {
      brand: "Dell",
      model: "XPS 13",
      warranty: "2 Years",
      color: ["Silver"],
      size: ["13 inch"],
    },
    stock: 12,
  },
  {
    name: "Nike Air Max 90",
    price: 8999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    ],
    description:
      "Classic Nike Air Max 90 sneakers with Air cushioning and iconic design.",
    category: "Fashion",
    specifications: {
      brand: "Nike",
      model: "Air Max 90",
      warranty: "No Warranty",
      color: ["White", "Black", "Red"],
      size: ["6", "7", "8", "9", "10", "11", "12"],
    },
    stock: 50,
  },
  {
    name: "Adidas Ultraboost 22",
    price: 13999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    ],
    description:
      "Premium Adidas running shoes with Boost technology for ultimate comfort and performance.",
    category: "Fashion",
    specifications: {
      brand: "Adidas",
      model: "Ultraboost 22",
      warranty: "No Warranty",
      color: ["Black", "White", "Blue"],
      size: ["6", "7", "8", "9", "10", "11", "12"],
    },
    stock: 40,
  },
  {
    name: "OnePlus 12",
    price: 55999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500",
    ],
    description:
      "Fast flagship smartphone with Snapdragon 8 Gen 3, 120Hz display, and 100W charging.",
    category: "Electronics",
    specifications: {
      brand: "OnePlus",
      model: "12",
      warranty: "1 Year",
      color: ["Black", "White"],
      size: ["256GB", "512GB"],
    },
    stock: 25,
  },
  {
    name: "Canon EOS R6 Mirrorless Camera",
    price: 195000,
    image: "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500",
    images: [
      "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500",
    ],
    description:
      "Professional mirrorless camera with 20MP sensor, 4K video, and advanced AF system.",
    category: "Electronics",
    specifications: {
      brand: "Canon",
      model: "EOS R6",
      warranty: "1 Year",
      color: ["Black"],
      size: ["Body Only"],
    },
    stock: 8,
  },
  {
    name: "Levi's 501 Original Jeans",
    price: 3999,
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500",
      "https://images.unsplash.com/photo-1542621334-2dbbf0d00c71?w=500",
    ],
    description:
      "Iconic Levi's 501 jeans with classic fit and timeless style. Made from premium denim.",
    category: "Fashion",
    specifications: {
      brand: "Levi's",
      model: "501",
      warranty: "No Warranty",
      color: ["Blue", "Black"],
      size: ["28", "30", "32", "34", "36", "38", "40"],
    },
    stock: 60,
  },
  {
    name: "iPad Pro 12.9-inch",
    price: 89999,
    image: "https://images.unsplash.com/photo-1585790050230-41eb2a172a16?w=500",
    images: [
      "https://images.unsplash.com/photo-1585790050230-41eb2a172a16?w=500",
    ],
    description:
      "Powerful iPad Pro with M2 chip, stunning Liquid Retina XDR display, and Pro cameras.",
    category: "Electronics",
    specifications: {
      brand: "Apple",
      model: "iPad Pro",
      warranty: "1 Year",
      color: ["Silver", "Space Gray"],
      size: ["12.9-inch"],
    },
    stock: 18,
  },
  {
    name: "GoPro HERO 12 Black",
    price: 49999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    ],
    description:
      "Compact action camera with 5.3K video, advanced stabilization, and rugged design.",
    category: "Electronics",
    specifications: {
      brand: "GoPro",
      model: "HERO 12 Black",
      warranty: "1 Year",
      color: ["Black"],
      size: ["One Size"],
    },
    stock: 22,
  },
  {
    name: "Beats by Dre Studio Pro",
    price: 34999,
    image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500",
    images: [
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500",
    ],
    description:
      "Premium over-ear headphones with Active Noise Cancellation and spatial audio support.",
    category: "Electronics",
    specifications: {
      brand: "Beats",
      model: "Studio Pro",
      warranty: "1 Year",
      color: ["Black", "Silver", "Gold"],
      size: ["One Size"],
    },
    stock: 28,
  },
];

// Sample Admin User
const sampleAdmin = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123", // Will be hashed
  role: "admin",
  phone: "9876543210",
  address: "Admin Address, City, State - 123456",
};

// Sample Regular User
const sampleUser = {
  name: "John Doe",
  email: "user@example.com",
  password: "user123", // Will be hashed
  role: "user",
  phone: "9123456789",
  address: "User Address, City, State - 654321",
};

/**
 * Main Seed Function
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log("📦 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional - uncomment to reset)
    // console.log("🗑️  Clearing existing data...");
    // await User.deleteMany({});
    // await Product.deleteMany({});
    // console.log("✅ Data cleared");

    // Check if products already exist
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log(`⚠️  ${productCount} products already exist. Skipping product seeding.`);
      console.log("   To reset, uncomment the deleteMany() lines and run again.");
    } else {
      // Create sample products
      console.log("🛍️  Adding sample products...");
      const createdProducts = await Product.insertMany(sampleProducts);
      console.log(`✅ ${createdProducts.length} products added successfully`);
    }

    // Check if admin user exists
    const adminExists = await User.findOne({ email: sampleAdmin.email });
    if (adminExists) {
      console.log("⚠️  Admin user already exists. Skipping admin creation.");
    } else {
      // Create admin user
      console.log("👨‍💼 Creating admin user...");
      const hashedAdminPassword = await bcrypt.hash(sampleAdmin.password, 10);
      const adminUser = new User({
        ...sampleAdmin,
        password: hashedAdminPassword,
      });
      await adminUser.save();
      console.log(`✅ Admin user created: ${sampleAdmin.email}`);
    }

    // Check if regular user exists
    const userExists = await User.findOne({ email: sampleUser.email });
    if (userExists) {
      console.log("⚠️  Regular user already exists. Skipping user creation.");
    } else {
      // Create regular user
      console.log("👤 Creating regular user...");
      const hashedUserPassword = await bcrypt.hash(sampleUser.password, 10);
      const regularUser = new User({
        ...sampleUser,
        password: hashedUserPassword,
      });
      await regularUser.save();
      console.log(`✅ Regular user created: ${sampleUser.email}`);
    }

    console.log("\n");
    console.log("╔═══════════════════════════════════════════════════════╗");
    console.log("║  🎉 Database Seeding Complete!                        ║");
    console.log("╚═══════════════════════════════════════════════════════╝");
    console.log("\n📝 Test Credentials:\n");
    console.log("  Admin Account:");
    console.log(`    Email: ${sampleAdmin.email}`);
    console.log(`    Password: ${sampleAdmin.password}\n`);
    console.log("  User Account:");
    console.log(`    Email: ${sampleUser.email}`);
    console.log(`    Password: ${sampleUser.password}\n`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
