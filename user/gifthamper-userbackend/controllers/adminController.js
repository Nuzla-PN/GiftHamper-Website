const Admin = require("../models/Admin");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const GiftBox = require("../models/GiftBox");
const Wrapping = require("../models/Wrapping");
const GreetingCard = require("../models/GreetingCard");
const { generateAdminToken } = require("../middleware/adminAuth");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.json({
      success: true,
      data: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role, token: generateAdminToken(admin._id) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalSellers = await Seller.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email");
    res.json({
      success: true,
      data: { totalSellers, totalProducts, totalOrders, totalRevenue, recentOrders },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Seller.countDocuments();
    const sellers = await Seller.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({
      success: true,
      data: { sellers, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleSellerActive = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
    seller.isActive = !seller.isActive;
    await seller.save();
    res.json({ success: true, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Order.countDocuments();
    const orders = await Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "name email");
    res.json({
      success: true,
      data: { orders, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    order.status = req.body.status;
    if (req.body.status === "delivered") order.deliveredAt = new Date();
    if (req.body.trackingId) order.trackingId = req.body.trackingId;
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGiftBoxes = async (req, res) => {
  try {
    const giftBoxes = await GiftBox.find().sort({ createdAt: -1 });
    res.json({ success: true, data: giftBoxes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.create(req.body);
    res.status(201).json({ success: true, data: giftBox });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!giftBox) return res.status(404).json({ success: false, message: "Gift box not found" });
    res.json({ success: true, data: giftBox });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.findByIdAndDelete(req.params.id);
    if (!giftBox) return res.status(404).json({ success: false, message: "Gift box not found" });
    res.json({ success: true, message: "Gift box deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWrappings = async (req, res) => {
  try {
    const wrappings = await Wrapping.find().sort({ createdAt: -1 });
    res.json({ success: true, data: wrappings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.create(req.body);
    res.status(201).json({ success: true, data: wrapping });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wrapping) return res.status(404).json({ success: false, message: "Wrapping not found" });
    res.json({ success: true, data: wrapping });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.findByIdAndDelete(req.params.id);
    if (!wrapping) return res.status(404).json({ success: false, message: "Wrapping not found" });
    res.json({ success: true, message: "Wrapping deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGreetingCards = async (req, res) => {
  try {
    const greetingCards = await GreetingCard.find().sort({ createdAt: -1 });
    res.json({ success: true, data: greetingCards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.create(req.body);
    res.status(201).json({ success: true, data: greetingCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!greetingCard) return res.status(404).json({ success: false, message: "Greeting card not found" });
    res.json({ success: true, data: greetingCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.findByIdAndDelete(req.params.id);
    if (!greetingCard) return res.status(404).json({ success: false, message: "Greeting card not found" });
    res.json({ success: true, message: "Greeting card deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
