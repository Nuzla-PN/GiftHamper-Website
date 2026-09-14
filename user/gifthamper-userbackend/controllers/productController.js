const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { search, category, sub, type, price, minPrice, maxPrice, rating, sort, page = 1, limit = 20, seller, featured } = req.query;
    let query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (category) query.mainCategory = category;
    if (sub) query.subCategory = sub;
    if (type) query.giftTypes = type;
    if (seller) query.sellerName = seller;
    if (featured === "true") query.isFeatured = true;
    if (rating) query.rating = { $gte: Number(rating) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (price) {
      const [min, max] = price.split("-").map(Number);
      query.price = { $gte: min, $lte: max || 999999 };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "rating") sortOption = { rating: -1 };
    else if (sort === "popular") sortOption = { reviews: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);

    res.json({ success: true, data: products, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true }).limit(8);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("mainCategory", { isActive: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkPincode = async (req, res) => {
  try {
    const { pincode } = req.params;
    const pincodeData = {
      "452001": { available: true, days: 2, express: true },
      "462001": { available: true, days: 3, express: false },
      "110001": { available: true, days: 4, express: false },
      "400001": { available: true, days: 3, express: true },
      "560001": { available: true, days: 4, express: false },
      "600001": { available: true, days: 5, express: false },
      "700001": { available: true, days: 5, express: false },
    };
    const result = pincodeData[pincode] || { available: false, days: 0, express: false };
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
