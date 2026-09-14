const Address = require("../models/Address");

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1 });
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { label, name, phone, address, pincode, city, state, isDefault } = req.body;
    const addr = await Address.create({ user: req.user._id, label, name, phone, address, pincode, city, state, isDefault });
    res.status(201).json({ success: true, data: addr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const addr = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!addr) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, data: addr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const addr = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!addr) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setDefault = async (req, res) => {
  try {
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
    const addr = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { isDefault: true }, { new: true });
    if (!addr) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, data: addr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
