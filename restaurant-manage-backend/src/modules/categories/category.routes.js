/**
 * ক্যাটাগরি রাউটস (Category Routes):
 * - GET / ➔ সব খাদ্য ক্যাটাগরির তালিকা প্রদান।
 * - POST / ➔ নতুন খাদ্য ক্যাটাগরি তৈরি।
 * - DELETE /:id ➔ ক্যাটাগরি আইডি অনুযায়ী মুছে ফেলা।
 */

const express = require("express");
const { getCategories, createCategory, deleteCategory } = require("./category.controller");

const router = express.Router();

router.route("/")
  .get(getCategories)
  .post(createCategory);

router.route("/:id")
  .delete(deleteCategory);

module.exports = router;
