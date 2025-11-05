import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/Layout/protected";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashbord";
import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

import Products from "./pages/Products/ProductList";
import ProductAdd from "./pages/Products/productAdd";
import ProductDetails from "./pages/Products/ProductDetails";
import ProductUpdate from "./pages/Products/ProductUpdate";

import Order from "./pages/Order/orderList";
import OrderDetails from "./pages/Order/orderDetails";
import Customer from "./pages/Customer/CustomerList";
import CustomerDetails from "./pages/Customer/CustomerDetails";
import CustomerUpdate from "./pages/Customer/CustomerUpdate";

import CategoryList from "./pages/Category/CategoryList";
import CategoryAdd from "./pages/Category/CategoryAdd";
import CategoryUpdate from "./pages/Category/CategoryUpdate";
import CategoryDetails from "./pages/Category/CategoryDetails";

import NotificationList from "./pages/Notification/NotificationList";
import ForgotPassword from "./pages/Reset-Password/ForgotPassword";
import ResetPassword from "./pages/Reset-Password/ResetPassword";

// ✅ Create context OUTSIDE the component
export const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value={{ name: "Gym Shop Admin" }}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/list"
            element={
              <ProtectedRoute>
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductAdd />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/details/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/update/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductUpdate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/list"
            element={
              <ProtectedRoute>
                <Layout>
                  <Order />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/details/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/list"
            element={
              <ProtectedRoute>
                <Layout>
                  <Customer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/details/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/update/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerUpdate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/list"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryAdd />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/update/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryUpdate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/details/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification/list"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute>
                <Layout>
                  <ForgotPassword />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
