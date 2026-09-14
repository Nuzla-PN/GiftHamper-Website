const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    productsCount: { type: Number, default: 0 },
    avatar: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
