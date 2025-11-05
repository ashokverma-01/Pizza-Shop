import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { deleteImage } from "../utils/cloudinary.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, isActive } = req.body;
    if (!name || !name.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }
    const category = new Category({
      name: name.trim(),
      isActive: isActive ?? true,
      imageUrl: file.path,
      imageId: file.filename,
    });

    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating category",
      error: error.message,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (file && category.imageId) {
      await deleteImage(category.imageId);
    }
    category.name = name;

    if (file) {
      category.imageUrl = file.path;
      category.imageId = file.filename;
    }

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    return res.status(400).json({ error: "isActive must be boolean" });
  }

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  category.isActive = isActive;
  await category.save();

  res.json({
    success: true,
    message: `Category ${isActive ? "activated" : "deactivated"} successfully`,
    category,
  });
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
  updateCategoryStatus,
};
