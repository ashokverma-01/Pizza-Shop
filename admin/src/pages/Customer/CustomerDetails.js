import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBackButton from "../../utils/BackButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axiosInstance from "../../utils/axiosUrl";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const handleBack = useBackButton("/customer/list");
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axiosInstance.get(`/api/users/${id}`);
        setCustomer(res.data);
      } catch (err) {
        console.error("Failed to fetch customer:", err);
      }
    };
    fetchCustomer();
  }, [id]);

  if (!customer)
    return (
      <p className="text-center mt-5 fw-semibold text-secondary">Loading...</p>
    );

  const handleEdittProfile = () => {
    navigate(`/customer/update/${customer?._id}`);
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-4 mt-4">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h4 className="fw-bold m-0 text-primary">Customer Details</h4>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>

        <div className="container mt-2">
          <div className="row align-items-start mt-3">
            {/* Profile Image */}
            <div className="col-lg-4 col-md-5 col-sm-12 mb-4 text-center">
              <div
                className="rounded-circle mx-auto d-flex align-items-center justify-content-center bg-light shadow-sm"
                style={{
                  width: "180px",
                  height: "180px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {customer.imageUrl ? (
                  <img
                    src={customer.imageUrl}
                    alt={customer.username}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span
                    className="text-uppercase text-white bg-primary d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "64px",
                      fontWeight: "600",
                    }}
                  >
                    {customer.username?.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="col-lg-8 col-md-7 col-sm-12">
              <h3 className="fw-bold mb-3 text-dark">{customer.username}</h3>

              <div className="mb-3">
                <h6 className="text-muted mb-1">Email</h6>
                <p className="fw-semibold">{customer.email}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-1">Status</h6>
                <span
                  className={`badge px-3 py-3 ${
                    customer.isAdmin ? "bg-success" : "bg-danger"
                  }`}
                >
                  {customer.isAdmin ? "Admin" : "Customer"}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="ms-auto">
                <Button
                  variant="contained"
                  color="success"
                  className="text-white"
                  onClick={handleEdittProfile}
                >
                  EDit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
