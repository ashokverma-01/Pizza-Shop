import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import useBackButton from "../../utils/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShowToast, Severity } from "../../utils/toast";

const ProductUpdate = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const { categories, fetchProducts } = useContext(AppContext);
  const handleBack = useBackButton("/products/list");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    countInStock: "",
    discount: "",
    quantity: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = res.data;
        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          price: product.price || "",
          category: product.category || "",
          description: product.description || "",
          countInStock: product.countInStock || 0,
          discount: product.discount || 0,
          quantity: product.quantity || 0,
          image: null,
        });
        setPreview(product.imageUrl || null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Failed to load product data");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Call update API
      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        ShowToast("Product Update successfully", Severity.SUCCESS);
        fetchProducts();
        Navigate("/product/list");
      } else {
        ShowToast("Product Update Error", Severity.ERROR);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-4 mt-4">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Update Product</h5>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Product Name */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Brand */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Price */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Stock Count */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Stock Count</label>
              <input
                type="number"
                name="countInStock"
                className="form-control"
                placeholder="Enter available stock"
                value={formData.countInStock}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    countInStock: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            {/* Quantity */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Product Image */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center gap-3">
              <div className="flex-grow-1">
                <label className="form-label fw-semibold">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {preview && (
                <div className="preview-image">
                  <img
                    src={preview}
                    alt="preview"
                    className="img-thumbnail shadow-sm"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
            {/*  Discount */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Discount</label>
              <input
                type="number"
                name="discount"
                className="form-control"
                placeholder="Enter available stock"
                value={formData.discount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discount: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Write a short product description..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-end mt-3">
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ px: 4, py: 1 }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
