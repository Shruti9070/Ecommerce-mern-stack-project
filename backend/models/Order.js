const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: "razorpay" },
    paymentId: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      zip: String,
    },
    orderNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
