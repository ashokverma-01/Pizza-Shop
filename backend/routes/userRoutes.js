import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  updateUserStatus,
  sendOTP,
  verifyOTP,
  resetPassword,
  addContactMessage,
} from "../controllers/userController.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const upload = multer({ storage });

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/contact", authenticate, addContactMessage);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, upload.single("image"), updateCurrentUserProfile);

// ADMIN ROUTES
router
  .route("/:id")
  .delete(deleteUserById)
  .get(getUserById)
  .put(upload.single("image"), updateUserById);
router.put("/status/:id", updateUserStatus);

export default router;
