import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import { ShowToast, Severity } from "../utils/toast";
import axiosInstance from "../utils/axiosUrl";

export const AppState = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? savedTheme === "light" : true;
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [order, setOrder] = useState([]);
  const [singleOrder, setSingleOrder] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [cache, setCache] = useState(
    JSON.parse(localStorage.getItem("translations")) || {}
  );

  const saveCache = (original, translated) => {
    const updated = { ...cache, [original]: translated };
    setCache(updated);
    localStorage.setItem("translations", JSON.stringify(updated));
  };

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const loginUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/api/users/auth", userData);

      if (res?.data?.user && res?.data?.user.token) {
        const userWithToken = {
          ...res.data.user,
          token: res.data.user.token || res.data.token,
        };

        setUser(userWithToken);
        localStorage.setItem("user", JSON.stringify(userWithToken));
      }

      triggerRefresh();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post(
        "/api/users/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      setUser(null);
      setCart([]);
      ShowToast("Logout successfully", Severity.SUCCESS);
      triggerRefresh();
    } catch (err) {
      ShowToast("Logout error", Severity.ERROR);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/products/allProducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/category/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get("/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user || !user.token) {
      ShowToast("Added to cart successfully!", "success");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/api/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCart(res.data.items || []);
      triggerRefresh();
      return res.data;
    } catch (error) {
      ShowToast("Add To Cart error", Severity.ERROR);
    }
  };

  const updateCart = async (productId, quantity) => {
    if (!user) return alert("Please login first!");
    try {
      const res = await axiosInstance.put(
        "/api/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart(res.data.cart);
      triggerRefresh();
    } catch (err) {
      console.error("Update cart failed:", err);
    }
  };

  const removeCart = async (productId) => {
    try {
      const res = await axiosInstance.delete("/api/cart/remove", {
        data: { productId },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart(res.data.cart);
      triggerRefresh();
    } catch (err) {
      console.error("Remove cart failed:", err);
    }
  };

  const clearCart = async () => {
    if (!user) return alert("Please login first!");

    try {
      await axiosInstance.delete("/api/cart/clear", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart([]);
      triggerRefresh();
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const { data } = await axiosInstance.get("/api/wishlist", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWishlist(data.map((item) => item._id));
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axiosInstance.post(
        `/api/wishlist/add`,
        { productId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setWishlist((prev) => [...prev, productId]);
      triggerRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWishlist((prev) => prev.filter((id) => id !== productId));
      triggerRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = async (productId) => {
    if (!user) return alert("Please login to use wishlist!");
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axiosInstance.post(
        "/api/orders",
        orderData,
        config
      );
      setOrder(data);
      setLoading(false);
      triggerRefresh();
      return data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
      throw err;
    }
  };

  const getUserOrders = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/orders/mine", {
        headers: { Authorization: `Bearer ${user.token}` },
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

  const getOrder = async (orderId) => {
    if (!user) throw new Error("User not logged in");
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSingleOrder(data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      console.error("Get Order Error:", err.response?.data || err);
      throw err;
    }
  };

  const getRelatedProducts = async (productId) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/products/related/${productId}`
      );
      setRelatedProducts(data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const translateText = async (text, targetLang) => {
    if (cache[text]) return cache[text];

    try {
      const res = await axiosInstance.get(
        `/api/translate?text=${encodeURIComponent(text)}&lang=${targetLang}`
      );

      const data = res.data;

      if (data.translatedText) {
        saveCache(text, data.translatedText);
        return data.translatedText;
      } else {
        return text;
      }
    } catch (error) {
      console.error("Translation failed:", error);
      return text;
    }
  };

  const translatePage = async (targetLang) => {
    const elements = document.querySelectorAll(
      "h1, h2, h3, p, span, button, a"
    );

    for (let el of elements) {
      const originalText = el.innerText.trim();
      if (!originalText) continue;

      const translated = await translateText(originalText, targetLang);
      el.innerText = translated;
    }
  };
  const toggleLanguage = async () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);

    if (newLang === "hi") {
      await translatePage("hi");
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("translations")) || {};
    setCache(saved);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
      getUserOrders();
    }
  }, [user]);

  useEffect(() => {
    let timeout;
    if (user && refresh) {
      timeout = setTimeout(() => {
        fetchCart();
        fetchWishlist();
        getUserOrders();
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [refresh]);

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

  const values = {
    themeMode,
    setThemeMode,
    products,
    categories,
    user,
    setUser,
    loginUser,
    logoutUser,
    cart,
    setCart,
    addToCart,
    fetchCart,
    updateCart,
    removeCart,
    clearCart,
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
    createOrder,
    loading,
    setError,
    error,
    getOrder,
    getUserOrders,
    order,
    refresh,
    triggerRefresh,
    getRelatedProducts,
    relatedProducts,
    language,
    toggleLanguage,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
