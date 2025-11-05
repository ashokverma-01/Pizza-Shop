import React, { useState } from "react";
import { ShowToast, Severity } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosUrl";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const sendOTP = async () => {
    try {
      await axiosInstance.post("/api/users/send-otp", { email });

      ShowToast("OTP sent to your email", Severity.SUCCESS);
      setStep(2);
    } catch (err) {
      ShowToast("Error sending OTP", Severity.ERROR);
    }
  };

  const verifyOTP = async () => {
    try {
      await axiosInstance.post("/api/users/verify-otp", {
        email,
        otp,
      });
      ShowToast("OTP verified", Severity.SUCCESS);

      setStep(3);
    } catch (err) {
      ShowToast("Invalid OTP", Severity.ERROR);
    }
  };

  const resetPassword = async () => {
    try {
      await axiosInstance.post("/api/users/reset-password", {
        email,
        password,
      });

      ShowToast("Password reset successful!", Severity.SUCCESS);

      onClose();
      navigate("/products");
    } catch (err) {
      ShowToast("Error resetting password", Severity.ERROR);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 sm:p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 text-xl hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOTP}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-green-600 dark:bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition-all"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={resetPassword}
              className="w-full bg-green-600 dark:bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition-all"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
