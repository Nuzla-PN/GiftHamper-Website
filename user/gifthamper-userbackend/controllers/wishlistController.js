const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.product");
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, items: [] });

    const index = wishlist.items.findIndex((item) => String(item.product) === String(productId));
    let action;
    if (index > -1) {
      wishlist.items.splice(index, 1);
      action = "removed";
    } else {
      wishlist.items.push({ product: productId });
      action = "added";
    }
    await wishlist.save();
    res.json({ success: true, data: wishlist, action });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ success: false, message: "Wishlist not found" });
    wishlist.items = wishlist.items.filter((item) => String(item.product) !== String(req.params.productId));
    await wishlist.save();
    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
