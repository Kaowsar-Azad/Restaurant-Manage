const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");
const Category = require("../models/Category");

const getMenuItems = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category = category;
      } else {
        const catDoc = await Category.findOne({ name: { $regex: new RegExp(`^${category.trim()}$`, "i") } });
        if (catDoc) {
          query.category = catDoc._id;
        } else {
          return res.json({ success: true, count: 0, data: [] });
        }
      }
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const items = await MenuItem.find(query).populate("category", "name").sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, category, price, description, image, status } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, price, and category are required" });
    }

    let categoryId = category;
    if (!mongoose.Types.ObjectId.isValid(category)) {
      let catDoc = await Category.findOne({ name: { $regex: new RegExp(`^${category.trim()}$`, "i") } });
      if (!catDoc) {
        catDoc = await Category.create({ name: category.trim() });
      }
      categoryId = catDoc._id;
    }

    const item = await MenuItem.create({
      name: name.trim(),
      category: categoryId,
      price: parseFloat(price),
      description: description || "",
      image: image || "",
      status: status || "Active",
    });

    const populated = await MenuItem.findById(item._id).populate("category", "name");
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    let updateData = { ...req.body };
    if (updateData.category && !mongoose.Types.ObjectId.isValid(updateData.category)) {
      let catDoc = await Category.findOne({ name: { $regex: new RegExp(`^${updateData.category.trim()}$`, "i") } });
      if (!catDoc) {
        catDoc = await Category.create({ name: updateData.category.trim() });
      }
      updateData.category = catDoc._id;
    }

    const item = await MenuItem.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).populate("category", "name");
    if (!item) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }
    res.json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
