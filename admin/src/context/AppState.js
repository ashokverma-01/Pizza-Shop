import { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { io } from "socket.io-client";
import { ShowToast, Severity } from "../utils/toast";

const socket = io("http://localhost:5000");
export const AppState = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") === "dark" ? false : true
  );
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState(null);
  const [userSelectedId, setUserSelectedId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/auth",
        { email, password },
        { withCredentials: true }
      );

      const {
        _id,
        username,
        email: userEmail,
        isAdmin,
        imageUrl,
        token,
      } = res.data.user;

      if (!isAdmin) {
        ShowToast("Only admin can login here", Severity.ERROR);
        return { success: false, message: "Only admin can login here" };
      }

      const userData = {
        _id,
        username,
        email: userEmail,
        isAdmin,
        imageUrl,
        token,
      };

      setIsLogin(true);
      setUser(userData);

      // Save to localStorage
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(userData));

      ShowToast("Login successfully", Severity.SUCCESS);
      return { success: true, user: userData };
    } catch (error) {
      ShowToast("Login error", Severity.ERROR);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );

      setIsLogin(false);
      setUser(null);
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      ShowToast("Logout successfully", Severity.SUCCESS);
    } catch (error) {
      ShowToast("Logout error", Severity.ERROR);
    }
  };
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/products/allProducts"
      );
      setProducts(data.products || data);
      setLoadingProducts(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductError(error.message);
      setLoadingProducts(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/products/add",
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setProducts((prev) => [...prev, data.product || data]);
      ShowToast("Add Product successfully", Severity.SUCCESS);
      fetchProducts();

      return { success: true, product: data.product || data }; // ✅ return added
    } catch (error) {
      ShowToast("Product error", Severity.ERROR);
      return { success: false, error }; // ✅ return added
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setShowModal(false);
      setSelectedProductId(null);
      ShowToast("Delete Product successfully", Severity.SUCCESS);
    } catch (err) {
      console.error(err);
      ShowToast("Product error", Severity.ERROR);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/category/categories"
      );
      setCategories(data.categories || data);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategoryError(error.message);
      setLoadingCategories(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/category",
        categoryData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setCategories((prev) => [...prev, data.category || data]);
      ShowToast("Add Category successfully", Severity.SUCCESS);
      fetchCategories();

      return { success: true, category: data.category || data };
    } catch (error) {
      ShowToast("Category error", Severity.ERROR);
      return { success: false, error };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${id}`, {
        withCredentials: true,
      });

      setCategories((prev) => prev.filter((c) => c._id !== id));
      setShowModal(false);
      setSelectedCategoryId(null);
      ShowToast("Delete Category successfully", Severity.SUCCESS);
    } catch (err) {
      console.error(err);
      ShowToast("Category error", Severity.ERROR);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      setUsers(data.users || data);
      setUserError(null);
      setLoadingUsers(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUserError(error.message);
      setLoadingUsers(false);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((c) => c._id !== id));
      setShowModal(false);
      setUserSelectedId(null);
      ShowToast("Delete Customer successfully", Severity.SUCCESS);
    } catch (err) {
      console.error(err);
      ShowToast("Customer error", Severity.ERROR);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/notification",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notification/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Delete notification
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));
      ShowToast("Delete Message Successfully", Severity.SUCCESS);
    } catch (err) {
      ShowToast("Delete Message error", Severity.ERROR);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5000/api/notification/all/delete", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setNotifications([]);
      ShowToast("All Delete Message Successfully", Severity.SUCCESS);
    } catch (err) {
      console.error(err);
      ShowToast("All Delete Message error", Severity.ERROR);
    }
  };
  const getOrder = async (orderId) => {
    if (!user) throw new Error("User not logged in");
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // must be correct
          },
        }
      );
      return data;
    } catch (err) {
      console.error("Get Order Error:", err.response?.data || err);
      throw err;
    }
  };

  const getUserOrders = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrder(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data || error.message);
      console.error("Error fetching user orders:", error);
      throw error;
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      ShowToast("Order deleted successfully", Severity.SUCCESS);
      // Remove deleted order from local state
      setOrder((prev) => prev.filter((ord) => ord._id !== id));
    } catch (error) {
      ShowToast("Delete Order Error:", Severity.ERROR);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Local UI update
      setOrder((prevOrders) =>
        prevOrders.map((ord) =>
          ord._id === orderId ? { ...ord, status: newStatus } : ord
        )
      );

      console.log("✅ Order status updated:", data);
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      alert(error.response?.data?.message || "Failed to update order status");
    }
  };

  // ✅ Count unread notifications dynamically
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // ✅ Listen for realtime notification event
    socket.on("newNotification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    // ✅ Cleanup on unmount
    return () => socket.off("newNotification");
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, []);

  const values = {
    isLogin,
    setIsLogin,
    user,
    setUser,
    login,
    logout,
    isToggleSidebar,
    setIsToggleSidebar,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    isMessenger,
    setIsMessenger,
    themeMode,
    setThemeMode,
    products,
    loadingProducts,
    productError,
    fetchProducts,
    categories,
    addProduct,
    deleteProduct,
    selectedProductId,
    setSelectedProductId,
    showModal,
    setShowModal,
    addCategory,
    categoryError,
    loadingCategories,
    deleteCategory,
    selectedCategoryId,
    setSelectedCategoryId,
    fetchCategories,
    users,
    loadingUsers,
    userError,
    fetchUsers,
    deleteCustomer,
    userSelectedId,
    setUserSelectedId,
    notifications,
    fetchNotifications,
    markAsRead,
    unreadCount,
    handleDeleteNotification,
    handleDeleteAll,
    getOrder,
    getUserOrders,
    order,
    loading,
    error,
    setError,
    deleteOrder,
    updateOrderStatus,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
