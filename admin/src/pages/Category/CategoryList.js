import { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ModalPop from "../../utils/ModalPop";
import Pagination from "../../utils/Pagination";
import { FaSearch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ShowToast, Severity } from "../../utils/toast";
import axiosInstance from "../../utils/axiosUrl";

const CategoryList = () => {
  const navigate = useNavigate();
  const {
    loadingCategories,
    categoryError,
    fetchCategories,
    categories,
    showModal,
    setShowModal,
    deleteCategory,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);
  const [searchName, setSearchName] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const categoryList = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    if (!searchName) {
      setFilteredList(categoryList);
    } else {
      const filtered = categoryList.filter((cat) =>
        cat.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchName, categories]);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategory = filteredList.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredList.length / categoriesPerPage);

  const addPage = () => navigate("/category/add");

  const handleFilter = async () => {
    try {
      const res = await axiosInstance.post("/api/category/filtered-category", {
        name: searchName,
      });
      setFilteredList(res.data);
    } catch (error) {
      console.error("Filter Error:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    deleteCategory(selectedCategoryId);
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await axiosInstance.put(`/api/category/status/${id}`, {
        isActive: newStatus,
      });

      if (res.data.success) {
        ShowToast(
          `Category ${newStatus ? "activated" : "deactivated"} successfully`,
          Severity.SUCCESS
        );
        fetchCategories();
      } else {
        ShowToast("Failed to update status", Severity.ERROR);
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      ShowToast("Error updating status", Severity.ERROR);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-3">
          <div className="table-responsive">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Category List</h4>

              <div className="searchBox d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  placeholder="Search category name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <FaSearch className="mr-2 FaSearch" onClick={handleFilter} />
              </div>

              <button className="btn btn-primary" onClick={addPage}>
                + New Category
              </button>
            </div>

            {/* Table Section */}
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>NAME</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {loadingCategories ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : categoryError ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3 text-danger">
                      Error: {categoryError}
                    </td>
                  </tr>
                ) : currentCategory.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No categories available.
                    </td>
                  </tr>
                ) : (
                  currentCategory.map((category, index) => (
                    <tr key={category._id}>
                      <td>{indexOfFirstCategory + index + 1}</td>
                      <td>
                        <div className="d-flex align-item-center productBox w-auto">
                          <div className="imgWrapper">
                            <div className="img">
                              <img
                                src={
                                  category.imageUrl || "/default-product.png"
                                }
                                className="w-100"
                                alt={category.name || "Category"}
                              />
                            </div>
                          </div>
                          <div className="info">
                            <h6>{category.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          color={category.isActive ? "success" : "error"}
                          onClick={() =>
                            handleStatusToggle(category._id, !category.isActive)
                          }
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Button>
                      </td>
                      <td>
                        <div className="actions d-flex align-items-center justify-content-center">
                          <Link to={`/category/details/${category._id}`}>
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
                          <Link to={`/category/update/${category._id}`}>
                            <Button className="success" color="success">
                              <IoPencil />
                            </Button>
                          </Link>
                          <Button
                            className="error"
                            color="error"
                            onClick={() => handleDeleteClick(category._id)}
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
        bodyContent="Are you sure you want to delete this category?"
      />
    </>
  );
};

export default CategoryList;
