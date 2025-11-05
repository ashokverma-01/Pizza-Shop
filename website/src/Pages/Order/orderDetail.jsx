import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { getOrder, user, singleOrder } = useContext(AppContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Loading order...</p>
      </div>
    );

  const statusSteps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-4 sm:p-6 md:p-8 bg-white text-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Order Details</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>

        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mt-4 mb-4">
          {statusSteps.map((step, index) => {
            const stepIndex = statusSteps.indexOf(order.status);
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

        <p className="mb-4">
          <strong>Total:</strong> ₹{order.totalPrice}
        </p>

        {/* Items */}
        <h3 className="text-xl font-semibold mb-3">Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center p-3 rounded-lg bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded mb-2 md:mb-0 md:mr-4"
              />
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-medium text-lg">{item.name}</h4>
                <p className="text-gray-700">
                  Qty: {item.qty} | Price: ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-gray-500 text-sm">
          Ordered on: {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
