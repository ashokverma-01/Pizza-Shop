import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
const upload = multer({ storage });
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
  updateCategoryStatus,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(upload.single("image"), createCategory);
router.route("/:id").put(upload.single("image"), updateCategory);
router.route("/status/:id").put(updateCategoryStatus);
router.route("/:id").delete(removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
