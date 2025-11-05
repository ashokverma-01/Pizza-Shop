import React, { useState, useContext } from "react";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import SignInModal from "../SignIn/SignInModal";
import { ShowToast, Severity } from "../../utils/toast";

const ProductCard = ({
  _id,
  imageUrl,
  name,
  description,
  price,
  discount,
  rating,
}) => {
  const { addToCart, user, cart, toggleWishlist, isInWishlist } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const liked = isInWishlist(_id);

  const discountedPrice = discount
    ? (price - price * (discount / 100)).toFixed(2)
    : price;

  const handleBuyNow = () => {
    navigate(`/product/${_id}`);
  };

  const isInCart = cart?.some(
    (item) => (item.productId?._id || item.productId) === _id
  );

  const handleCart = async () => {
    if (!user) {
      setIsSignInOpen(true);
      return;
    }

    if (!_id) return;

    if (isInCart) return;

    await addToCart(_id, 1);
    ShowToast("Added to cart successfully!", "success");
  };
  const handleWishlistClick = async () => {
    if (!user) {
      setIsSignInOpen(true);
      return;
    }

    if (!_id) return;

    try {
      await toggleWishlist(_id);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden w-full max-w-[300px] sm:max-w-[350px] mx-auto hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Heart Icon */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                user && liked
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400 fill-none"
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center sm:justify-start gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 dark:text-gray-300 text-xs ml-2">
              ({rating})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              ${discountedPrice}
            </span>
            {discount && (
              <>
                <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                  ${price}
                </span>
                <span className="text-sm text-red-500 font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                isInCart
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleCart}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add To Cart"}
            </button>
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ SignIn Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
};

export default ProductCard;
