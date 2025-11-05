import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import useBackButton from "../../utils/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShowToast, Severity } from "../../utils/toast";

const CategoryUpdate = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const { fetchCategories } = useContext(AppContext);
  const handleBack = useBackButton("/category/list");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch existing product data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/category/${id}`);
        const category = res.data;
        setFormData({
          name: category.name || "",
          image: null,
        });
        setPreview(category.imageUrl || null);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };

    fetchCategory();
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
        `http://localhost:5000/api/category/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        ShowToast("Category Update successfully", Severity.SUCCESS);
        fetchCategories();
        Navigate("/category/list");
      } else {
        ShowToast("Category Update Error", Severity.ERROR);
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
          <h5 className="fw-bold m-0">Update Category</h5>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Category Name */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-semibold">Category Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Image */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center gap-3">
              <div className="flex-grow-1">
                <label className="form-label fw-semibold">Category Image</label>
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

            {/* Submit Button */}
            <div className="col-12 text-end mt-3">
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ px: 4, py: 1 }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdate;
