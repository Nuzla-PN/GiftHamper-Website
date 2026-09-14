const Product = require("../models/Product");

exports.addReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const alreadyReviewed = product.reviewsData.find(
      (r) => String(r.user) === String(req.user._id)
    );
    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: "You already reviewed this product" });
    }

    product.reviewsData.push({ user: req.user._id, name: req.user.name, rating: Number(rating), title, comment });
    product.reviews = product.reviewsData.length;
    product.rating = product.reviewsData.reduce((acc, r) => acc + r.rating, 0) / product.reviewsData.length;
    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    const review = product.reviewsData.find((r) => String(r._id) === String(req.params.reviewId));
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    if (String(review.user) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    review.rating = Number(rating);
    review.title = title;
    review.comment = comment;
    product.rating = product.reviewsData.reduce((acc, r) => acc + r.rating, 0) / product.reviewsData.length;
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    const review = product.reviewsData.find((r) => String(r._id) === String(req.params.reviewId));
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    if (String(review.user) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    product.reviewsData = product.reviewsData.filter((r) => String(r._id) !== String(req.params.reviewId));
    product.reviews = product.reviewsData.length;
    product.rating = product.reviews > 0 ? product.reviewsData.reduce((acc, r) => acc + r.rating, 0) / product.reviews : 0;
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
