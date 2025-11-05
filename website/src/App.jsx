import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import ScrollTopButton from "./utils/ScrollToTopButton";
import ScrollToHashElement from "./utils/ScrollToHashElement";
import SocialSidebar from "./utils/SocialSidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import AllProduct from "./Pages/Product/AllProduct";
import ProductDetails from "./Pages/Product/ProductDetails";
import CartPage from "./Pages/Cart/CartPage";
import WishList from "./Pages/WishList/WishPage";
import CheckOutForm from "./Pages/Order/CheckOutForm";
import OrderDetail from "./Pages/Order/orderDetail";
import Profile from "./Pages/Auth/Profile";
import HomePage from "./Pages/Home/HomePage";
import AllOrder from "./Pages/Order/AllOrder";
import Privacy from "./Pages/Privacy/PrivacyPolicy";
import Terms from "./Pages/Terms/TermsAndConditions";
import ShippingInfo from "./Pages/ShippingInfo/ShippingInfo";
import Faq from "./Pages/Faq/Faq";

function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <SocialSidebar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="container mx-auto px-4 py-8 ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/checkout" element={<CheckOutForm />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/allorder" element={<AllOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacypolicy" element={<Privacy />} />
            <Route path="/terms&conditions" element={<Terms />} />
            <Route path="/shippinginfo" element={<ShippingInfo />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </main>

        <Footer />
        <ScrollTopButton />
      </div>
    </Router>
  );
}

export default App;
