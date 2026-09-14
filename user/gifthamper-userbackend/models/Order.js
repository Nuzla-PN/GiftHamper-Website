const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
    default: "pending",
  },
  reviewed: { type: Boolean, default: false },
  returnRequested: { type: Boolean, default: false },
  returnReason: { type: String, default: "" },
  addons: {
    giftBox: { id: String, name: String, price: Number },
    wrapping: { id: String, name: String, price: Number },
    giftCard: { id: String, name: String, price: Number },
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    shippingAddress: {
      label: String,
      name: String,
      phone: String,
      address: String,
      pincode: String,
    },
    paymentMethod: { type: String, default: "COD" },
    subtotal: Number,
    gst: Number,
    shippingCharge: { type: Number, default: 0 },
    couponDiscount: { type: Number, default: 0 },
    total: Number,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    trackingId: { type: String, default: "" },
    deliveredAt: { type: Date },
    cancelReason: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
