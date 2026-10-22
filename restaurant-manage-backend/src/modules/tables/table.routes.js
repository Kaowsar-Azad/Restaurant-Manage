/**
 * ডাইনিং টেবিল রাউটস (Table Routes):
 * - GET / ➔ রেস্টুরেন্টের সব টেবিল ও অকুপেন্সি স্ট্যাটাস ফেচ করা।
 * - POST / ➔ নতুন টেবিল যোগ করা।
 * - PATCH /:id/status ➔ টেবিল স্ট্যাটাস (Available, Occupied, Reserved, Cleaning) পরিবর্তন করা।
 * - DELETE /:id ➔ টেবিল মুছে ফেলা।
 */

const express = require("express");
const {
  getTables,
  createTable,
  updateTableStatus,
  deleteTable,
} = require("./table.controller");

const router = express.Router();

router.route("/")
  .get(getTables)
  .post(createTable);

router.route("/:id")
  .delete(deleteTable);

router.route("/:id/status")
  .patch(updateTableStatus);

module.exports = router;
