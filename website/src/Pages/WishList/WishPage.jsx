import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, products, removeFromWishlist } = useContext(AppContext);
  const navigate = useNavigate();

  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p._id === id))
    .filter(Boolean); // remove undefined if product not found

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Wishlist
        </h1>
        <button
          onClick={() => navigate(-1)} // goes back to previous page
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product, index) => (
          <div
            key={product._id || index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  ${product.price}
                </span>

                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-full transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
