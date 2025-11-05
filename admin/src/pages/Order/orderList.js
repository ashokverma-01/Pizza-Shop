import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ModalPop from "../../utils/ModalPop";
import Pagination from "../../utils/Pagination";
import { Button } from "@mui/material";
import { MdOutlineRemoveRedEye, MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const OrderList = () => {
  const navigate = useNavigate();
  const {
    getUserOrders,
    order = [],
    loading,
    error,
    user,
    deleteOrder,
    showModal,
    setShowModal,
    updateOrderStatus,
  } = useContext(AppContext);

  const [searchName, setSearchName] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (user) {
      getUserOrders();
    }
  }, [user]);

  useEffect(() => {
    if (order) {
      setFilteredList(
        order.filter((ord) =>
          ord.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
          )
        )
      );
    }
  }, [searchName, order]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredList.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredList.length / ordersPerPage);

  const handleDelete = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedOrderId) {
      deleteOrder(selectedOrderId);
      setShowModal(false);
      setSelectedOrderId(null);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-3">
          <div className="table-responsive">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Order List</h4>

              <div className="searchBox d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  placeholder="Search product name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <FaSearch className="mr-2 FaSearch" />
              </div>

              <button className="btn btn-primary" onClick={handleBack}>
                Back
              </button>
            </div>

            {/* Table Section */}
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>PRODUCT NAME</th>
                  <th>Item Price</th>
                  <th>Total Price</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3 text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((ord, index) => (
                    <tr key={ord._id}>
                      <td>{indexOfFirstOrder + index + 1}</td>
                      <td>
                        {ord.orderItems.map((item, i) => (
                          <div
                            key={i}
                            className="d-flex align-items-center mb-1"
                          >
                            <div className="imgWrapper me-2">
                              <img
                                src={item.image || "/default-product.png"}
                                alt={item.name}
                                className="w-50"
                              />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </td>
                      <td>
                        {ord.orderItems
                          .reduce((sum, item) => sum + item.price * item.qty, 0)
                          .toFixed(2)}
                      </td>
                      <td>
                        {(
                          ord.orderItems.reduce(
                            (sum, item) => sum + item.price * item.qty,
                            0
                          ) +
                          ord.taxPrice +
                          ord.shippingPrice
                        ).toFixed(2)}
                      </td>

                      <td>
                        <select
                          className="form-select"
                          value={ord.status}
                          onChange={(e) =>
                            handleStatusChange(ord._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td>
                        <div className="actions d-flex align-items-center justify-content-center gap-2">
                          <Link to={`/order/details/${ord._id}`}>
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
                          <Button
                            className="error"
                            color="error"
                            onClick={() => handleDelete(ord._id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredList.length > 0 && (
          <div className="d-flex justify-content-end mt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      <ModalPop
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirm}
        title="Confirm Delete"
        bodyContent="Are you sure you want to delete this order?"
      />
    </>
  );
};

export default OrderList;
