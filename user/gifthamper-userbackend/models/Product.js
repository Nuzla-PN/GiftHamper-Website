const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, default: "" },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    image: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    reviewsData: [reviewSchema],
    features: [{ type: String }],
    tags: [{ type: String }],
    mainCategory: { type: String, required: true },
    subCategory: { type: String, default: "" },
    giftTypes: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    customizable: { type: Boolean, default: false },
    customizations: [
      {
        name: String,
        type: String,
        options: [String],
        price: Number,
      },
    ],
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    sellerName: { type: String, default: "" },
    sellerRating: { type: Number, default: 4.5 },
    sellerReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", tags: "text" });
productSchema.index({ mainCategory: 1, subCategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFeatured: 1 });

module.exports = mongoose.model("Product", productSchema);
