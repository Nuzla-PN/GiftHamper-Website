const router = require("express").Router();
const { createOrder, getOrders, getOrderById, cancelOrder, returnOrderItem } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId/cancel", cancelOrder);
router.put("/:orderId/item/:itemId/return", returnOrderItem);

module.exports = router;
