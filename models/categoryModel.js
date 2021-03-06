const mongoose = require("mongoose");
const slugify = require("slugify");

const category = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name "],
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

category.pre("save", function (next) {
  this.name = this.name[0].toUpperCase() + this.name.substring(1);
  next();
});

category.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = mongoose.model("Category", category);
