const router = require("express").Router();
const { getSellers, getSellerByName } = require("../controllers/sellerController");

router.get("/", getSellers);
router.get("/:name", getSellerByName);

module.exports = router;
