require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/reviews", require("./routes/review"));
app.use("/api/addresses", require("./routes/address"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/sellers", require("./routes/sellers"));
app.use("/api/addons", require("./routes/addon"));

app.get("/", (req, res) => res.json({ message: "GiftHamper API Running" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
