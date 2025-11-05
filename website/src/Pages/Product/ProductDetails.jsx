import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import AppContext from "../../Context/AppContext";
import SignInModal from "../SignIn/SignInModal";
import { ShowToast } from "../../utils/toast";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import axiosInstance from "../../utils/axiosUrl";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-8 top-1/2 transform -translate-y-1/2 
    bg-blue-600 dark:bg-blue-500 
    text-white p-3 rounded-full 
    hover:bg-blue-700 dark:hover:bg-blue-400 
    shadow-lg z-20 transition-all duration-300"
  >
    <FaArrowRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-8 top-1/2 transform -translate-y-1/2 
    bg-blue-600 dark:bg-blue-500 
    text-white p-3 rounded-full 
    hover:bg-blue-700 dark:hover:bg-blue-400 
    shadow-lg z-20 transition-all duration-300"
  >
    <FaArrowLeft size={18} />
  </button>
);

const ProductDetails = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const { user, addToCart, cart, relatedProducts, getRelatedProducts } =
    useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/api/products/${id}`);
      const data = res.data;

      setProduct(data);

      if (data?._id) getRelatedProducts(data._id);
    } catch (err) {
      console.error("Fetch product error:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3); // ✅ Max 3 slides on large screens
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
    ],
  };

  if (!product)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const discountedPrice = product.discount
    ? (product.price - product.price * (product.discount / 100)).toFixed(2)
    : product.price;

  const isInCart = cart?.some(
    (item) => (item.productId?._id || item.productId) === product._id
  );

  // ✅ Add to Cart
  const handleCart = async () => {
    if (!user) return setIsSignInOpen(true);
    if (isInCart) return;

    try {
      const res = await addToCart(product._id, quantity);
      res
        ? ShowToast("Added to cart successfully!", "success")
        : ShowToast("Failed to add to cart", "error");
    } catch (error) {
      console.error("Cart error:", error);
      ShowToast("Something went wrong!", "error");
    }
  };

  // ✅ Add Review
  const handleReviewSubmit = async () => {
    if (!user) return setIsSignInOpen(true);
    if (!rating || !comment.trim())
      return ShowToast("Please add both rating and comment", "error");

    try {
      setLoadingReview(true);

      // ✅ Axios version of your API call
      const res = await axiosInstance.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      ShowToast("Review added successfully!", "success");
      setComment("");
      setRating(0);
      fetchProduct(); // refresh product data
    } catch (error) {
      console.error("Review error:", error);
      ShowToast(
        error.response?.data?.message || "Something went wrong!",
        "error"
      );
    } finally {
      setLoadingReview(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Product Details
            </h2>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>

          {/* Product Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            {/* Left — Image + Cart */}
            <div className="flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-sm rounded-lg object-contain shadow-md"
              />

              {/* Rating Summary */}
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        product.rating > i
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {product.numReviews > 0
                    ? `${product.numReviews} Review${
                        product.numReviews > 1 ? "s" : ""
                      }`
                    : "No reviews yet"}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleCart}
                disabled={isInCart || product.countInStock === 0}
                className={`mt-16 w-full py-3 rounded-lg font-semibold transition-all 
                  ${
                    isInCart || product.countInStock === 0
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isInCart
                  ? "Added to Cart"
                  : product.countInStock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>

            {/* Right — Details */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {product.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.countInStock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  ₹{discountedPrice}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm line-through text-gray-500">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-red-500 font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Qty:</span>
                <input
                  type="number"
                  min="1"
                  max={product.countInStock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center rounded-md border px-2 py-1 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Rating & Comment */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Rate this product
                </h3>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${
                        (hoverRating || rating) > i
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>

                <textarea
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full mt-3 border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                  rows="3"
                ></textarea>

                <button
                  onClick={handleReviewSubmit}
                  disabled={loadingReview}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  {loadingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Related Products */}
          {relatedProducts.length > 0 && (
            <section className="py-10 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                Related <span className="text-blue-600">Products</span>
              </h1>

              <div className="relative max-w-full mx-auto">
                <Slider {...sliderSettings}>
                  {relatedProducts.map((item, idx) => (
                    <div key={idx} className="px-2 sm:px-3 md:px-4">
                      <ProductCard {...item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          )}

          {/* ✅ Reviews */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Customer Reviews
            </h3>

            {product.reviews?.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {rev.name}
                      </span>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              rev.rating > i
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      {rev.comment}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
};

export default ProductDetails;
