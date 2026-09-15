const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { generateSellerToken } = require("../middleware/sellerAuth");

exports.sellerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and password" });
    }
    const existingSeller = await Seller.findOne({ $or: [{ email }, { name }] });
    if (existingSeller) {
      return res.status(400).json({ success: false, message: "Seller with this email or name already exists" });
    }
    const seller = await Seller.create({ name, email, password });
    const token = generateSellerToken(seller._id);
    res.status(201).json({
      success: true,
      data: {
        token,
        seller: { id: seller._id, name: seller.name, email: seller.email, phone: seller.phone, description: seller.description, avatar: seller.avatar, isActive: seller.isActive },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await seller.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    if (!seller.isActive) {
      return res.status(403).json({ success: false, message: "Your account has been deactivated. Please contact admin." });
    }
    const token = generateSellerToken(seller._id);
    res.json({
      success: true,
      data: {
        token,
        seller: { id: seller._id, name: seller.name, email: seller.email, phone: seller.phone, description: seller.description, avatar: seller.avatar, rating: seller.rating, reviews: seller.reviews, productsCount: seller.productsCount, isActive: seller.isActive },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getSellerProfile = async (req, res) => {
  try {
    res.json({ success: true, data: req.seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateSellerProfile = async (req, res) => {
  try {
    const { name, phone, description, avatar } = req.body;
    const seller = await Seller.findById(req.seller._id);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }
    if (name) seller.name = name;
    if (phone !== undefined) seller.phone = phone;
    if (description !== undefined) seller.description = description;
    if (avatar !== undefined) seller.avatar = avatar;
    await seller.save();
    res.json({ success: true, data: seller, message: "Profile updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments({ sellerId: req.seller._id, isActive: true });
    const products = await Product.find({ sellerId: req.seller._id, isActive: true }).skip(skip).limit(limit).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { products, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      sellerId: req.seller._id,
      sellerName: req.seller.name,
      sellerRating: req.seller.rating,
      sellerReviews: req.seller.reviews,
    });
    await Seller.findByIdAndUpdate(req.seller._id, { $inc: { productsCount: 1 } });
    res.status(201).json({ success: true, data: product, message: "Product created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this product" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updatedProduct, message: "Product updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this product" });
    }
    product.isActive = false;
    await product.save();
    await Seller.findByIdAndUpdate(req.seller._id, { $inc: { productsCount: -1 } });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sellerProducts = await Product.find({ sellerId: req.seller._id }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);
    const total = await Order.countDocuments({ "items.product": { $in: productIds } });
    const orders = await Order.find({ "items.product": { $in: productIds } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    res.json({
      success: true,
      data: { orders, page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const item = order.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    const product = await Product.findById(item.product);
    if (!product || product.sellerId.toString() !== req.seller._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this item" });
    }
    item.status = status;
    await order.save();
    res.json({ success: true, data: order, message: "Item status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
