import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity, price: product.price }],
      totalPrice: product.price * quantity,
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  const updatedCart = await cart.save();
  res.status(200).json(updatedCart);
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId",
    "name price imageUrl discount"
  );

  if (!cart) {
    return res.status(200).json({ message: "Cart is empty", items: [] });
  }

  res.status(200).json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  const updatedItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (updatedItem) updatedItem.quantity = quantity;
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updatedCart = await cart.save();
  const populatedCart = await updatedCart.populate("items.productId");

  res.status(200).json({ cart: populatedCart.items });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updatedCart = await cart.save();
  const populatedCart = await updatedCart.populate("items.productId");

  res.status(200).json({ cart: populatedCart.items });
});

const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user._id });
  res.status(200).json({ message: "Cart cleared successfully" });
});

export { addToCart, getCart, updateCartItem, removeCartItem, clearCart };
