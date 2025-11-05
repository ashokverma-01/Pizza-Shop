import { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ModalPop from "../../utils/ModalPop";
import Pagination from "../../utils/Pagination";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const {
    products,
    loadingProducts,
    productError,
    categories,
    deleteProduct,
    showModal,
    setShowModal,
    selectedProductId,
    setSelectedProductId,
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [category, setCategory] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searchName, setSearchName] = useState();

  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  useEffect(() => {
    if (!category) {
      setFilteredList(productList);
    } else {
      const filtered = productList.filter(
        (p) => p.category?.name?.toLowerCase() === category.toLowerCase()
      );
      setFilteredList(filtered);
    }
  }, [category, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProduct = (filteredList || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil((filteredList?.length || 0) / productsPerPage);

  const addPage = () => navigate("/product/add");

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    deleteProduct(selectedProductId);
  };

  const handleFilter = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/filtered-products",
        { name: searchName } // e.g. "protein"
      );
      setFilteredList(res.data);
    } catch (error) {
      console.error("Filter Error:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-3">
          <div className="table-responsive">
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Left side — Heading */}
              <h4 className="fw-bold mb-0">Product List</h4>

              {/* Center — Search bar */}
              <div className="searchBox d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  placeholder="Search product name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />

                <FaSearch className="mr-2 FaSearch" onClick={handleFilter} />
              </div>

              <button className="btn btn-primary" onClick={addPage}>
                + New Product
              </button>
            </div>

            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>DISCOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {loadingProducts ? (
                  <tr>
                    <td colSpan="8" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : productError ? (
                  <tr>
                    <td colSpan="8" className="text-center py-3 text-danger">
                      Error: {productError}
                    </td>
                  </tr>
                ) : currentProduct.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-3">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  currentProduct.map((product, index) => (
                    <tr key={product._id}>
                      <td>{indexOfFirstProduct + index + 1}</td>
                      <td>
                        <div className="d-flex align-item-center productBox w-auto">
                          <div className="imgWrapper">
                            <div className="img">
                              <img
                                src={product.imageUrl || "/default-product.png"}
                                className="w-100"
                                alt={product.name || "Product"}
                              />
                            </div>
                          </div>
                          <div className="info">
                            <h6>{product.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        {categories.find((cat) => cat._id === product.category)
                          ?.name || "N/A"}
                      </td>
                      <td>{product.brand}</td>
                      <td>
                        <span className="new text-danger">
                          ${product.price}
                        </span>
                      </td>
                      <td>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </td>
                      <td>{product.rating}%</td>
                      <td>{product.discount}%</td>
                      <td>
                        <div className="actions d-flex align-items-center justify-content-center">
                          <Link to={`/product/details/${product._id}`}>
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
                          <Link to={`/product/update/${product._id}`}>
                            <Button className="success" color="success">
                              <IoPencil />
                            </Button>
                          </Link>
                          <Button
                            className="error"
                            color="error"
                            onClick={() => handleDeleteClick(product._id)}
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

      <ModalPop
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirm}
        title="Confirm Delete"
        bodyContent="Are you sure you want to delete this product?"
      />
    </>
  );
};

export default Products;
