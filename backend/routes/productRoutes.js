import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
const router = express.Router();
const upload = multer({ storage });

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getRelatedProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.get("/", fetchProducts);
router.post(
  "/add",
  upload.single("image"),

  addProduct
);

router.route("/allProducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("/:id").get(fetchProductById);
router.put("/:id", upload.single("image"), updateProductDetails);
router.delete("/:id", removeProduct);

router.route("/filtered-products").post(filterProducts);
router.route("/related/:id").get(getRelatedProducts);

export default router;
