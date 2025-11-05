import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, addToWishlist);
router.get("/", authenticate, getWishlist);
router.delete("/:productId", authenticate, removeFromWishlist);

export default router;
