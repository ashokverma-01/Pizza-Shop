import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../controllers/notificationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);

router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);
router.delete("/all/delete", deleteAllNotifications);

export default router;
