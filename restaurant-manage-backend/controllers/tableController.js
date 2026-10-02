const RestaurantTable = require("../models/RestaurantTable");

const getTables = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== "All") {
      query.status = status;
    }
    const tables = await RestaurantTable.find(query).populate("currentOrder").sort({ tableNumber: 1 });
    res.json({ success: true, count: tables.length, data: tables });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTable = async (req, res) => {
  try {
    const { tableNumber, capacity, status } = req.body;
    if (!tableNumber) {
      return res.status(400).json({ success: false, message: "Table number is required" });
    }

    const existing = await RestaurantTable.findOne({ tableNumber: tableNumber.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Table already exists" });
    }

    const table = await RestaurantTable.create({
      tableNumber: tableNumber.trim(),
      capacity: parseInt(capacity) || 4,
      status: status || "Available",
    });

    res.status(201).json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await RestaurantTable.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!table) {
      return res.status(404).json({ success: false, message: "Table not found" });
    }
    res.json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const table = await RestaurantTable.findByIdAndDelete(req.params.id);
    if (!table) {
      return res.status(404).json({ success: false, message: "Table not found" });
    }
    res.json({ success: true, message: "Table deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTables, createTable, updateTableStatus, deleteTable };
