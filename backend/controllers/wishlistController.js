import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const user = await User.findById(userId);

  if (user.wishlist.includes(productId)) {
    res.status(400);
    throw new Error("Product already in wishlist");
  }

  user.wishlist.push(productId);
  await user.save();

  res
    .status(200)
    .json({ message: "Product added to wishlist", wishlist: user.wishlist });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== productId.toString()
  );
  await user.save();

  res.status(200).json({
    message: "Product removed from wishlist",
    wishlist: user.wishlist,
  });
});

const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("wishlist");

  res.status(200).json(user.wishlist);
});

export { addToWishlist, removeFromWishlist, getWishlist };
