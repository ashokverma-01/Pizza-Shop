import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderDetails.css"; // Custom CSS for progress bar

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOrder, user } = useContext(AppContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) return;
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id, user, getOrder]);

  if (!order) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <p className="text-dark fs-5">Loading order...</p>
      </div>
    );
  }

  const statusSteps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0  mt-4 p-5">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Order Details</h5>
          <button onClick={() => navigate(-1)} className="btn btn-primary px-3">
            Back
          </button>
        </div>

        {/* Order Info */}
        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Ordered On:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{order.totalPrice}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="order-progress mb-5">
          {statusSteps.map((step, index) => (
            <div key={step} className="progress-step">
              <div
                className={`step-circle ${
                  index <= currentStep ? "completed" : ""
                } ${order.status === "Cancelled" ? "cancelled" : ""}`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <div className="step-label">{step}</div>
              {index < statusSteps.length - 1 && (
                <div
                  className={`step-line ${
                    index < currentStep ? "completed" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Items */}
        <h5 className="mb-3 ">Items</h5>
        <div className="row g-3">
          {order.orderItems.map((item) => (
            <div key={item._id} className="col-12 col-md-6">
              <div className="card p-3 h-100">
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded mb-2 mb-md-0"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-md-3 text-center text-md-start">
                    <h6>{item.name}</h6>
                    <p className="mb-0">
                      Qty: {item.qty} | Price: ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
