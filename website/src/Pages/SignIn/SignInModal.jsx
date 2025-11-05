import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppContext from "../../Context/AppContext";
import { ShowToast, Severity } from "../../utils/toast";
import ForgotPasswordModal from "../../Pages/Auth/ForgotPasswordModal";
import pizzaLogin from "../../../assets/login.jpg";

const SignInModal = ({ isOpen, onClose, openSignUp, openForgotPassword }) => {
  const { loginUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      if (res?.data) {
        ShowToast("Login successfully", Severity.SUCCESS);
        onClose();
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      ShowToast("Login error", Severity.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 SignIn Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl flex flex-col sm:flex-row overflow-hidden">
          {/* Left Image Section */}
          <div
            className="hidden sm:block sm:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: `url(${pizzaLogin})`,
            }}
          ></div>

          {/* Right Form Section */}
          <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign In
              </h2>
              <button
                onClick={onClose}
                className="text-gray-700 dark:text-gray-300 text-xl hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Password with show/hide */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* 👇 Forgot Password Button */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition-all"
              >
                Sign In
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 w-full border border-gray-400 dark:border-gray-600 rounded-md py-2 mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <FcGoogle className="text-xl" />
                <span className="text-gray-800 dark:text-gray-200">
                  Sign in with Google
                </span>
              </button>
            </form>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Don’t have an account?{" "}
              <button
                onClick={openSignUp}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
