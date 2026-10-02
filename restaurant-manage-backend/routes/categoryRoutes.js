const express = require("express");
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getCategories);
router.post("/", protect, authorize("Admin", "Manager"), createCategory);
router.delete("/:id", protect, authorize("Admin", "Manager"), deleteCategory);

module.exports = router;
