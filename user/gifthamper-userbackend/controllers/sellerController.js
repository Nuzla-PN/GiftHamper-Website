const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { generateSellerToken } = require("../middleware/sellerAuth");

exports.sellerRegister = async (req, res) => {
  try {
    const { name, email, password, description, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    const exists = await Seller.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Seller already exists with this email" });
    }
    const seller = await Seller.create({ name, email, password, description, phone });
    res.status(201).json({
      success: true,
      data: { _id: seller._id, name: seller.name, email: seller.email, phone: seller.phone, description: seller.description, token: generateSellerToken(seller._id) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller || !(await seller.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (!seller.isActive) {
      return res.status(403).json({ success: false, message: "Your account has been deactivated" });
    }
    res.json({
      success: true,
      data: { _id: seller._id, name: seller.name, email: seller.email, phone: seller.phone, description: seller.description, token: generateSellerToken(seller._id) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller._id);
    res.json({ success: true, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSellerProfile = async (req, res) => {
  try {
    const { name, phone, description, avatar } = req.body;
    const seller = await Seller.findByIdAndUpdate(
      req.seller._id,
      { name, phone, description, avatar },
      { new: true }
    );
    res.json({ success: true, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments({ sellerId: req.seller._id });
    const products = await Product.find({ sellerId: req.seller._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({
      success: true,
      data: { products, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      sellerId: req.seller._id,
      sellerName: req.seller.name,
    });
    req.seller.productsCount += 1;
    await req.seller.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this product" });
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this product" });
    }
    product.isActive = false;
    await product.save();
    res.json({ success: true, message: "Product deactivated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const sellerProducts = await Product.find({ sellerId: req.seller._id }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Order.countDocuments({ "items.product": { $in: productIds } });
    const orders = await Order.find({ "items.product": { $in: productIds } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email");
    res.json({
      success: true,
      data: { orders, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateItemStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    const product = await Product.findById(item.product);
    if (!product || product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this item" });
    }
    item.status = status;
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
