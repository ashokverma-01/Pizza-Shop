import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.put("/update", authenticate, updateCartItem);
router.delete("/remove", authenticate, removeCartItem);
router.delete("/clear", authenticate, clearCart);

export default router;
