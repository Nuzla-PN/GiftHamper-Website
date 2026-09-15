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
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = generateAdminToken(admin._id);
    res.json({
      success: true,
      data: {
        token,
        admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, avatar: admin.avatar, role: admin.role },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalSellers = await Seller.countDocuments();
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email");
    res.json({
      success: true,
      data: { totalSellers, totalProducts, totalOrders, totalRevenue, recentOrders },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Seller.countDocuments();
    const sellers = await Seller.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { sellers, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.toggleSellerActive = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }
    seller.isActive = !seller.isActive;
    await seller.save();
    res.json({ success: true, data: seller, message: `Seller ${seller.isActive ? "activated" : "deactivated"}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Order.countDocuments();
    const orders = await Order.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate("user", "name email");
    res.json({
      success: true,
      data: { orders, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingId, cancelReason } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.status = status;
    if (trackingId) order.trackingId = trackingId;
    if (cancelReason) order.cancelReason = cancelReason;
    if (status === "delivered") order.deliveredAt = new Date();
    await order.save();
    res.json({ success: true, data: order, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon, message: "Coupon created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, data: coupon, message: "Coupon updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getGiftBoxes = async (req, res) => {
  try {
    const giftBoxes = await GiftBox.find().sort({ createdAt: -1 });
    res.json({ success: true, data: giftBoxes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.create(req.body);
    res.status(201).json({ success: true, data: giftBox, message: "Gift box created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!giftBox) {
      return res.status(404).json({ success: false, message: "Gift box not found" });
    }
    res.json({ success: true, data: giftBox, message: "Gift box updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.findByIdAndDelete(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ success: false, message: "Gift box not found" });
    }
    res.json({ success: true, message: "Gift box deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getWrappings = async (req, res) => {
  try {
    const wrappings = await Wrapping.find().sort({ createdAt: -1 });
    res.json({ success: true, data: wrappings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.create(req.body);
    res.status(201).json({ success: true, data: wrapping, message: "Wrapping created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!wrapping) {
      return res.status(404).json({ success: false, message: "Wrapping not found" });
    }
    res.json({ success: true, data: wrapping, message: "Wrapping updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteWrapping = async (req, res) => {
  try {
    const wrapping = await Wrapping.findByIdAndDelete(req.params.id);
    if (!wrapping) {
      return res.status(404).json({ success: false, message: "Wrapping not found" });
    }
    res.json({ success: true, message: "Wrapping deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getGreetingCards = async (req, res) => {
  try {
    const greetingCards = await GreetingCard.find().sort({ createdAt: -1 });
    res.json({ success: true, data: greetingCards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.create(req.body);
    res.status(201).json({ success: true, data: greetingCard, message: "Greeting card created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!greetingCard) {
      return res.status(404).json({ success: false, message: "Greeting card not found" });
    }
    res.json({ success: true, data: greetingCard, message: "Greeting card updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteGreetingCard = async (req, res) => {
  try {
    const greetingCard = await GreetingCard.findByIdAndDelete(req.params.id);
    if (!greetingCard) {
      return res.status(404).json({ success: false, message: "Greeting card not found" });
    }
    res.json({ success: true, message: "Greeting card deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
