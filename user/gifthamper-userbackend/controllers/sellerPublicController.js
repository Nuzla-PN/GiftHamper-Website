const Seller = require("../models/Seller");

exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ isActive: true });
    res.json({ success: true, data: sellers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSellerByName = async (req, res) => {
  try {
    const seller = await Seller.findOne({ name: decodeURIComponent(req.params.name) });
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
    res.json({ success: true, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
