const mongoose = require("mongoose");

const subCategory = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    trim: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SubCategory", subCategory);
