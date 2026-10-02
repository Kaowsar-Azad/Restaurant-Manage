const express = require("express");
const router = express.Router();
const { getTables, createTable, updateTableStatus, deleteTable } = require("../controllers/tableController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getTables);
router.post("/", createTable);
router.patch("/:id/status", updateTableStatus);
router.delete("/:id", deleteTable);

module.exports = router;
