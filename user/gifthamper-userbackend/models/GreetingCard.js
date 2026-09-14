const mongoose = require("mongoose");

const greetingCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  defaultMessage: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("GreetingCard", greetingCardSchema);
