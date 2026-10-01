const mongoose = require("mongoose");


const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
      required: true,
    },
    price: {
      type: Number, 
      required: true,
      min: 0, 
    },
    description: {
      type: String, 
      default: "",
    },
    image: {
      type: String, 
      default: "",
    },
    status: {
      type: String, 
      enum: ["Active", "Inactive"], 
      default: "Active",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);

