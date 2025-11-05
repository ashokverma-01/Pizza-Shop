import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import AppContext from "../../context/AppContext";
import ModalPop from "../../utils/ModalPop";
import Pagination from "../../utils/Pagination";
import useBackButton from "../../utils/BackButton";
import { ShowToast, Severity } from "../../utils/toast";
import axiosInstance from "../../utils/axiosUrl";

const CustomerList = () => {
  const handleBack = useBackButton("/");
  const {
    users,
    loadingUsers,
    userError,
    showModal,
    setShowModal,
    deleteCustomer,
    userSelectedId,
    setUserSelectedId,
    fetchUsers,
  } = useContext(AppContext);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(6);
  const [filteredList, setFilteredList] = useState([]);

  const customerList = Array.isArray(users) ? users : [];

  useEffect(() => {
    if (!searchName) {
      setFilteredList(customerList);
    } else {
      const filtered = customerList.filter((cat) =>
        cat.username.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchName, users]);

  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomer = filteredList.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(filteredList.length / customerPerPage);

  const handleDeleteClick = (id) => {
    setUserSelectedId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    deleteCustomer(userSelectedId);
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await axiosInstance.put(
        `/api/users/status/${id}`,
        { isAdmin: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        ShowToast(res.data.message, "success");
        fetchUsers();
      }
    } catch (error) {
      console.error("Status update failed:", error);
      ShowToast("Failed to update status", "error");
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-3">
          <div className="table-responsive">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Customer List</h4>

              <div className="searchBox d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  placeholder="Search customer name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />

                <FaSearch className="mr-2 FaSearch" />
              </div>

              <button onClick={handleBack} className="btn btn-primary px-3">
                <i className="bi bi-arrow-left me-2"></i> Back
              </button>
            </div>

            {/* 🧾 Table Section */}
            {loadingUsers ? (
              <p className="text-center">Loading customers...</p>
            ) : userError ? (
              <p className="text-danger text-center">{userError}</p>
            ) : (
              <table className="table table-bordered v-align">
                <thead className="thead-dark">
                  <tr>
                    <th>UID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {currentCustomer && currentCustomer.length > 0 ? (
                    currentCustomer.map((customer, index) => (
                      <tr key={customer._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-item-center productBox w-auto">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white me-2"
                              style={{
                                width: "40px",
                                height: "40px",
                                fontWeight: "600",
                                fontSize: "18px",
                                overflow: "hidden",
                              }}
                            >
                              {customer.imageUrl ? (
                                <img
                                  src={customer.imageUrl}
                                  alt={customer.username}
                                  className="rounded-circle"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <span className="">
                                  {customer.username?.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>

                            <div className="info">
                              <h6>{customer.username}</h6>
                            </div>
                          </div>
                        </td>

                        <td>{customer.email}</td>

                        <td className="text-center">
                          <Button
                            variant="contained"
                            color={customer.isAdmin ? "success" : "error"}
                            onClick={() =>
                              handleStatusToggle(
                                customer._id,
                                !customer.isAdmin
                              )
                            }
                          >
                            {customer.isAdmin ? "Admin" : "Customer"}
                          </Button>
                        </td>

                        <td>
                          <div className="actions d-flex align-items-center justify-content-center">
                            <Link to={`/customer/details/${customer._id}`}>
                              <Button
                                className="secondary"
                                color="secondary"
                                style={{
                                  backgroundColor: "#28a745",
                                  borderColor: "#28a745",
                                }}
                              >
                                <MdOutlineRemoveRedEye />
                              </Button>
                            </Link>
                            <Link to={`/customer/update/${customer._id}`}>
                              <Button className="success" color="success">
                                <IoPencil />
                              </Button>
                            </Link>
                            <Button
                              className="error"
                              color="error"
                              onClick={() => handleDeleteClick(customer._id)}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No customers available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {filteredList.length > 0 && (
          <div className="d-flex justify-content-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      <ModalPop
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirm}
        title="Confirm Delete"
        bodyContent="Are you sure you want to delete this customer?"
      />
    </>
  );
};

export default CustomerList;
