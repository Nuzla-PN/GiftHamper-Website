require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const exists = await Admin.findOne({ email: "admin@gifthamper.com" });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@gifthamper.com",
      password: "admin123",
    });
    console.log("Admin seeded:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
