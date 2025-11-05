import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import generateToken from "../utils/createToken.js";
import { deleteImage } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createNotification } from "../controllers/notificationController.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl,
      token,
    },
  });
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching user profile" });
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.file) {
    user.imageUrl = req.file.secure_url || req.file.path;
  }

  const updatedUser = await user.save();

  const token = generateToken(res, updatedUser._id);

  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    imageUrl: updatedUser.imageUrl,
    token,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const file = req.file;
    if (file) {
      if (user.imageId) {
        await deleteImage(user.imageId);
      }
      user.imageUrl = file.path;
      user.imageId = file.filename;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl || null,
      message: "Profile updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  if (typeof isAdmin !== "boolean") {
    return res.status(400).json({ error: "isActive must be boolean" });
  }

  const customer = await User.findById(id);
  if (!customer) {
    return res.status(404).json({ error: "customer not found" });
  }

  customer.isAdmin = isAdmin;
  await customer.save();

  res.json({
    success: true,
    message: `Customer ${isAdmin ? "activated" : "deactivated"} successfully`,
    customer,
  });
});

let otpStore = {};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "ak228308@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });
  if (record.otp != otp)
    return res.status(400).json({ message: "Invalid OTP" });

  res.json({ message: "OTP verified successfully" });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  delete otpStore[email];
  res.json({ message: "Password reset successfully" });
};
const addContactMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message cannot be empty");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.contactMessages.push({ message });
  await user.save();

  await createNotification({
    type: "contact",
    message: `${user.username} sent a message: "${message}"`,
    userId: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been saved.",
    contactMessages: user.contactMessages,
  });
});

export {
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
};
