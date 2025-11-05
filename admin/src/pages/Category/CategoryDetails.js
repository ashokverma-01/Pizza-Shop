import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBackButton from "../../utils/BackButton";
import axiosInstance from "../../utils/axiosUrl";

const CategoryDetails = () => {
  const handleBack = useBackButton("/products/list");

  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get(`/api/category/${id}`);
        setCategory(res.data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };
    fetchCategories();
  }, [id]);

  if (!category) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-3 mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Category Details</h5>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>
        <div className="container mt-2">
          <div className="row">
            {/* Left: Product Image */}
            <div className="col-lg-5 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
              <img
                src={category.imageUrl || "https://via.placeholder.com/400x400"}
                alt={category.name}
                className="img-fluid rounded shadow-sm"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Right: Product Details */}
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2 className="mb-4">{category.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
