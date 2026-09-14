const router = require("express").Router();
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart, applyCoupon } = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/item/:itemId", updateCartItem);
router.delete("/item/:itemId", removeCartItem);
router.delete("/clear", clearCart);
router.post("/coupon", applyCoupon);

module.exports = router;
