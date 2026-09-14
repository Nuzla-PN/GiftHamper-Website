const router = require("express").Router();
const { getGiftBoxes, getWrappings, getGreetingCards, validateCoupon } = require("../controllers/addonController");

router.get("/gift-boxes", getGiftBoxes);
router.get("/wrappings", getWrappings);
router.get("/greeting-cards", getGreetingCards);
router.get("/coupon/:code", validateCoupon);

module.exports = router;
