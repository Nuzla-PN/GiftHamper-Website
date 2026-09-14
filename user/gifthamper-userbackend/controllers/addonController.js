const GiftBox = require("../models/GiftBox");
const Wrapping = require("../models/Wrapping");
const GreetingCard = require("../models/GreetingCard");
const Coupon = require("../models/Coupon");

exports.getGiftBoxes = async (req, res) => {
  try {
    const items = await GiftBox.find({ isActive: true });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWrappings = async (req, res) => {
  try {
    const items = await Wrapping.find({ isActive: true });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGreetingCards = async (req, res) => {
  try {
    const items = await GreetingCard.find({ isActive: true });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) return res.status(404).json({ success: false, message: "Invalid coupon" });
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
