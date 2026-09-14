const mongoose = require("mongoose");

const wrappingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Wrapping", wrappingSchema);
