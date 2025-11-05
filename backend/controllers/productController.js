import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { deleteImage } from "../utils/cloudinary.js";
import { createNotification } from "../controllers/notificationController.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
      discount,
    } = req.body;

    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
      discount,
      imageUrl: file?.path,
      imageId: file?.filename,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
      discount,
    } = req.body;
    const file = req.file;

    if (
      !name ||
      !brand ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !countInStock ||
      !discount
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (file && product.imageId) {
      await deleteImage(product.imageId);
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.quantity = quantity;
    product.countInStock = countInStock;
    product.discount = discount;
    product.brand = brand;

    if (file) {
      product.imageUrl = file.path;
      product.imageId = file.filename;
    }

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      await createNotification({
        type: "review",
        message: `${req.user.username} rated ${product.name}: ${rating} stars. Comment: "${comment}"`,
        userId: req.user._id,
        rating: rating,
      });
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { name = "" } = req.body;

    let query = {};
    if (name.trim() !== "") {
      query.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
const getRelatedProducts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const related = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(10);

    res.json(related);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export {
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
};
