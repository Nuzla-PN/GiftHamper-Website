const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, name, description, image, price, originalPrice, quantity, stock, sellerId, sellerName, addons, totalPrice } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const addonKey = JSON.stringify(addons || {});
    const existingIndex = cart.items.findIndex(
      (item) => String(item.product) === String(productId) && JSON.stringify(item.addons || {}) === addonKey
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity || 1;
      cart.items[existingIndex].totalPrice = cart.items[existingIndex].price * cart.items[existingIndex].quantity;
    } else {
      cart.items.push({
        product: productId, name, description, image, price, originalPrice,
        quantity: quantity || 1, stock, sellerId, sellerName, addons, totalPrice: totalPrice || price * (quantity || 1),
      });
    }

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    item.quantity = quantity;
    item.totalPrice = item.price * quantity;
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    cart.items = cart.items.filter((item) => String(item._id) !== String(req.params.itemId));
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const Coupon = require("../models/Coupon");
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) return res.status(404).json({ success: false, message: "Invalid coupon code" });
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon has expired" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    const subtotal = cart.items.reduce((sum, item) => sum + (item.totalPrice || item.price * item.quantity), 0);
    if (subtotal < coupon.minAmount) {
      return res.status(400).json({ success: false, message: `Minimum order amount ₹${coupon.minAmount} required` });
    }
    let discount = coupon.type === "percentage" ? (subtotal * coupon.value) / 100 : coupon.value;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
    cart.couponCode = code.toUpperCase();
    cart.couponDiscount = discount;
    await cart.save();
    res.json({ success: true, data: cart, discount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
