const router = require("express").Router();
const { addReview, updateReview, deleteReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

router.post("/:id", protect, addReview);
router.put("/:id/:reviewId", protect, updateReview);
router.delete("/:id/:reviewId", protect, deleteReview);

module.exports = router;
