const router = require("express").Router();
const { getProducts, getProductById, getFeaturedProducts, getCategories, checkPincode } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/pincode/:pincode", checkPincode);
router.get("/:id", getProductById);

module.exports = router;
