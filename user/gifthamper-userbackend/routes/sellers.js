const router = require("express").Router();
const { getSellers, getSellerByName } = require("../controllers/sellerPublicController");

router.get("/", getSellers);
router.get("/:name", getSellerByName);

module.exports = router;
