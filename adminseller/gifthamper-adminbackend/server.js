require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/admin"));
app.use("/api/seller", require("./routes/seller"));

app.get("/", (req, res) => res.json({ message: "GiftHamper Admin+Seller API Running" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Admin+Seller backend running on port ${PORT}`));
