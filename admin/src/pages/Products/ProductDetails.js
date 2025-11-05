import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdPricetag } from "react-icons/io";
import { FaWindowRestore } from "react-icons/fa";
import useBackButton from "../../utils/BackButton";
import AppContext from "../../context/AppContext";

const ProductDetails = () => {
  const handleBack = useBackButton("/products/list");
  const { categories } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-3 mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Product Details</h5>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>
        <div className="container mt-2">
          <div className="row">
            {/* Left: Product Image */}
            <div className="col-lg-5 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
              <img
                src={product.imageUrl || "https://via.placeholder.com/400x400"}
                alt={product.name}
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
              <h2 className="mb-4">{product.name}</h2>

              <div className="row mb-3">
                <div className="col-12 col-sm-6 d-flex">
                  <MdBrandingWatermark className="me-2" />{" "}
                  <strong>Brand:</strong>
                </div>
                <div className="col-12 col-sm-6">{product.brand}</div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-sm-6 d-flex">
                  <BiSolidCategoryAlt className="me-2" />{" "}
                  <strong>Category:</strong>
                </div>
                <div className="col-12 col-sm-6">
                  {categories.find((cat) => cat._id === product.category)
                    ?.name || "N/A"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-sm-6 d-flex">
                  <IoMdPricetag className="me-2" /> <strong>Price:</strong>
                </div>
                <div className="col-12 col-sm-6">₹{product.price}</div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-sm-6 d-flex">
                  <FaWindowRestore className="me-2" /> <strong>Stock:</strong>
                </div>
                <div className="col-12 col-sm-6">
                  {product.countInStock} Piece
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <strong>Description:</strong>
                </div>
                <div className="col-12 mt-2">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
