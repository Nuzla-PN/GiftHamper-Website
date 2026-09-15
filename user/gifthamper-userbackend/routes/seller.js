const router = require("express").Router();
const { protectSeller } = require("../middleware/sellerAuth");
const {
  sellerRegister,
  sellerLogin,
  getSellerProfile,
  updateSellerProfile,
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  updateItemStatus,
} = require("../controllers/sellerController");

router.post("/register", sellerRegister);
router.post("/login", sellerLogin);
router.get("/profile", protectSeller, getSellerProfile);
router.put("/profile", protectSeller, updateSellerProfile);
router.get("/products", protectSeller, getSellerProducts);
router.post("/products", protectSeller, createProduct);
router.put("/products/:id", protectSeller, updateProduct);
router.delete("/products/:id", protectSeller, deleteProduct);
router.get("/orders", protectSeller, getSellerOrders);
router.put("/orders/:orderId/items/:itemId/status", protectSeller, updateItemStatus);

module.exports = router;
