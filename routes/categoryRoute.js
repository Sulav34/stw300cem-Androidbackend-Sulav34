const express = require("express");
const {
  createCategory,
  categoryList,
  deleteCategory,
  getCategoryById,
  updateCategory,
  createSubCategory,
  subCategoryList,
  deleteSUbCategory,
  getSubCategoryById,
  updateSubCategory,
} = require("../controllers/categoryControllers");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

//Category
router.post("/main/create", verifyUser, verifyAdmin, createCategory);
router.get("/main/list", categoryList);
router.delete("/main/:id", verifyAdmin, deleteCategory);
router.get("/main/:id", getCategoryById);
router.patch("/main/:id", verifyAdmin, updateCategory);

//Sub category
router.post("/sub/create", verifyUser, verifyAdmin, createSubCategory);
router.get("/sub/list", subCategoryList);
router.delete("/sub/:id", verifyAdmin, deleteSUbCategory);
router.get("/sub/:id", getSubCategoryById);
router.patch("/sub/:id", verifyAdmin, updateSubCategory);

module.exports = router;
