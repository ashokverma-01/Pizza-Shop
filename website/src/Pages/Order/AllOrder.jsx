import React, { useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AllOrder = () => {
  const navigate = useNavigate();
  const { getUserOrders, order, loading, error, user } = useContext(AppContext);

  useEffect(() => {
    if (user && user.token) {
      getUserOrders();
    }
  }, [user]);

  // ✅ Safe handling (ensure array)
  const orders = Array.isArray(order) ? order : order?.orders || [];

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Please login to see your orders.
      </p>
    );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Loading orders...
      </p>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const statusSteps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Orders
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No orders found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((ord) => (
            <div
              key={ord._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-t-lg">
                <div className="font-medium text-sm md:text-base mb-3">
                  Order ID: {ord._id}
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const stepIndex = statusSteps.indexOf(ord.status);
                    const isCompleted = index <= stepIndex;

                    return (
                      <div key={step} className="flex-1 relative text-center">
                        <div
                          className={`w-6 h-6 mx-auto rounded-full border-2 ${
                            isCompleted
                              ? "bg-green-500 border-green-500"
                              : "bg-white border-gray-400"
                          }`}
                        ></div>

                        <span className="text-xs mt-1 block">{step}</span>

                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute top-3 left-1/2 w-full h-1 -ml-1/2 ${
                              index < stepIndex ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Total: ₹{ord.totalPrice?.toFixed(2)}
                </p>
                <h6 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Items:
                </h6>
                <div className="space-y-2 flex-1 overflow-auto">
                  {ord.orderItems?.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mb-2 md:mb-0 md:mr-3"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <h6 className="font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h6>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Qty: {item.qty} | ₹{item.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                <span>{new Date(ord.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => navigate(`/order/${ord._id}`)}
                  className="px-3 py-1 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded text-xs hover:bg-blue-600 hover:text-white transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
