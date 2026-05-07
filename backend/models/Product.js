const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    images: [String],
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    specifications: {
      brand: String,
      model: String,
      warranty: String,
      color: [String],
      size: [String],
    },
    stock: { type: Number, default: 1 },
    createdBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);