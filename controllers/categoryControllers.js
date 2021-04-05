const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({ category });
});

exports.categoryList = catchAsync(async (req, res, next) => {
  const categoriesList = await Category.find();

  res.status(201).json({ length: categoriesList.length, categoriesList });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const editCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!editCategory) {
    return next(
      new AppError(`Category with that ${req.params.id}not found`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    editCategory,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("No category found with that Id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
});

//Sub category

exports.createSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.create(req.body);

  res.status(201).json({ subCategory });
});

exports.subCategoryList = catchAsync(async (req, res, next) => {
  const subCategoriesList = await SubCategory.find().populate("categoryID");

  res.status(201).json({ subCategoriesList });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
  const editSubCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!editSubCategory) {
    return next(
      new AppError(`Sub-Category with that ${req.params.id}not found`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    editSubCategory,
  });
});

exports.deleteSUbCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCategory) {
    return next(new AppError("No sub-category found with that Id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getSubCategoryById = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!SubCategory) {
    return new AppError(
      `Sub Category with that ${req.params.id} not found`,
      404
    );
  }
  res.status(200).json(subCategory);
});
