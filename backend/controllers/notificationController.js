import Notification from "../models/notificationModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getIo } from "../utils/socket.js";

const createNotification = async ({ type, message, userId }) => {
  const notification = new Notification({ type, message, user: userId });
  await notification.save();

  const io = getIo();
  io.emit("newNotification", notification);
  return notification;
};

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "username imageUrl",
    });

  res.json(notifications);
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  notification.isRead = true;
  await notification.save();
  res.json({ success: true });
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  res.json({ message: "Notification deleted successfully" });
});

const deleteAllNotifications = asyncHandler(async (req, res) => {
  await Notification.deleteMany({});
  res.json({ message: "All notifications deleted successfully" });
});

export {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
};
