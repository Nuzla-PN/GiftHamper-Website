const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  description: String,
  image: String,
  price: Number,
  originalPrice: Number,
  quantity: { type: Number, default: 1 },
  stock: Number,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  sellerName: String,
  addons: {
    giftBox: { id: String, name: String, price: Number },
    wrapping: { id: String, name: String, price: Number },
    giftCard: { id: String, name: String, price: Number },
  },
  totalPrice: Number,
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    couponCode: { type: String, default: null },
    couponDiscount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
