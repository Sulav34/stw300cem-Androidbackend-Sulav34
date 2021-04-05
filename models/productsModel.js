const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price must be included"],
    },
    size: {
      type: String,
      required: [true, "Size must be included"],
    },
    brand: {
      type: String,
    },
    // image: {
    //   type: String,
    //   required: [true, "Image must be included"],
    // },

    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      text: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    // categoryID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Category is required"],
    // },

    // subCategoryID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Category is required"],
    // },

    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    numReviews: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = Product = mongoose.model("Product", productSchema);
