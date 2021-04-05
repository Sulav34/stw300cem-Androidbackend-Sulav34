const express = require("express");
const {
  createProduct,
  productList,
  updateProduct,
  deleteProduct,
  getProductByID,
  searchProducts,
  listBySearch,
  // filterProducts,
} = require("../controllers/productController");
// const { protect, restrictTo } = require("../middlewares/auth");
const {
  verifyAdmin,
  verifyCustomer,
  verifyUser,
  // verifyCustomerAdmin,
} = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post(
  "/create",
  verifyUser,
  verifyAdmin,
  upload.single("image"),
  createProduct
);
router.get("/list", productList);
router.patch("/:id", verifyUser, verifyAdmin, updateProduct);
router.delete("/:id", verifyUser, verifyAdmin, deleteProduct);
router.get("/:id", getProductByID);

//search
router.post("/", searchProducts);

// Filtering
router.post("/filters", listBySearch);

module.exports = router;
