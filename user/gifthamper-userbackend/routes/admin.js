const router = require("express").Router();
const { protectAdmin } = require("../middleware/adminAuth");
const {
  adminLogin,
  getDashboard,
  getAllSellers,
  toggleSellerActive,
  getAllOrders,
  updateOrderStatus,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getGiftBoxes,
  createGiftBox,
  updateGiftBox,
  deleteGiftBox,
  getWrappings,
  createWrapping,
  updateWrapping,
  deleteWrapping,
  getGreetingCards,
  createGreetingCard,
  updateGreetingCard,
  deleteGreetingCard,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/dashboard", protectAdmin, getDashboard);
router.get("/sellers", protectAdmin, getAllSellers);
router.put("/sellers/:id/toggle", protectAdmin, toggleSellerActive);
router.get("/orders", protectAdmin, getAllOrders);
router.put("/orders/:id/status", protectAdmin, updateOrderStatus);
router.get("/coupons", protectAdmin, getCoupons);
router.post("/coupons", protectAdmin, createCoupon);
router.put("/coupons/:id", protectAdmin, updateCoupon);
router.delete("/coupons/:id", protectAdmin, deleteCoupon);
router.get("/giftboxes", protectAdmin, getGiftBoxes);
router.post("/giftboxes", protectAdmin, createGiftBox);
router.put("/giftboxes/:id", protectAdmin, updateGiftBox);
router.delete("/giftboxes/:id", protectAdmin, deleteGiftBox);
router.get("/wrappings", protectAdmin, getWrappings);
router.post("/wrappings", protectAdmin, createWrapping);
router.put("/wrappings/:id", protectAdmin, updateWrapping);
router.delete("/wrappings/:id", protectAdmin, deleteWrapping);
router.get("/greetingcards", protectAdmin, getGreetingCards);
router.post("/greetingcards", protectAdmin, createGreetingCard);
router.put("/greetingcards/:id", protectAdmin, updateGreetingCard);
router.delete("/greetingcards/:id", protectAdmin, deleteGreetingCard);

module.exports = router;
