const Order = require("../models/Order");
const Cart = require("../models/Cart");

const generateOrderId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${new Date().getFullYear()}-${num}`;
};

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    const subtotal = cart.items.reduce((sum, item) => sum + (item.totalPrice || item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.18);
    const shippingCharge = subtotal >= 999 ? 0 : 49;
    const total = subtotal + gst + shippingCharge - (cart.couponDiscount || 0);

    const order = await Order.create({
      user: req.user._id,
      orderId: generateOrderId(),
      items: cart.items.map((item) => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        addons: item.addons,
      })),
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      subtotal,
      gst,
      shippingCharge,
      couponDiscount: cart.couponDiscount || 0,
      total,
    });

    cart.items = [];
    cart.couponCode = null;
    cart.couponDiscount = 0;
    await cart.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user._id, orderId: req.params.orderId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user._id, orderId: req.params.orderId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status === "delivered") {
      return res.status(400).json({ success: false, message: "Cannot cancel delivered order" });
    }
    order.status = "cancelled";
    order.cancelReason = req.body.reason || "";
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.returnOrderItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { reason, description } = req.body;
    const order = await Order.findOne({ user: req.user._id, orderId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    item.returnRequested = true;
    item.returnReason = reason || description || "";
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
