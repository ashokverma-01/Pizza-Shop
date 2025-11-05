import React, { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, fetchCart, removeCart, updateCart, clearCart, user } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      navigate("/"); // redirect if not logged in
    }
  }, [user]);

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-700 dark:text-gray-300">
        Please login to view your cart.
      </div>
    );

  if (!cart) return <p className="text-center mt-20">Loading...</p>;

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const originalTotal = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );
  const discountedTotal = cart.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    const discount = item.productId?.discount || 0;
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    return sum + finalPrice * item.quantity;
  }, 0);
  const totalDiscount = originalTotal - discountedTotal;

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cart,
        totalItems,
        originalTotal,
        totalDiscount,
        finalAmount: discountedTotal,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Side - Cart Items */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Cart
            </h2>

            {cart.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  {totalItems} Items | Total ₹{discountedTotal.toFixed(2)}
                </div>
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId?._id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow gap-4"
              >
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name}
                  className="w-20 h-20 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-center sm:justify-start text-center sm:text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.productId?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Price: ₹{item.productId?.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateCart(item.productId._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateCart(item.productId._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-r"
                  >
                    +
                  </button>
                </div>

                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹
                  {(
                    item.productId?.price *
                    item.quantity *
                    (1 - (item.productId?.discount || 0) / 100)
                  ).toFixed(2)}
                </p>

                <button
                  onClick={() => removeCart(item.productId._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md ml-auto sm:ml-4"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Price Details & Checkout */}
        <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Price Details
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>Total Items: {totalItems}</p>
            <p>Original Price: ₹{originalTotal.toFixed(2)}</p>
            <p className="text-green-600 dark:text-green-400">
              Discount: -₹{totalDiscount.toFixed(2)}
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              Final Amount: ₹{discountedTotal.toFixed(2)}
            </p>

            {totalDiscount > 0 && (
              <p className="text-sm text-green-500">
                🎉 You saved ₹{totalDiscount.toFixed(2)} on this order!
              </p>
            )}

            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
