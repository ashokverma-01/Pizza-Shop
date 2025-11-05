import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useBackButton from "../../utils/BackButton";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleBack = useBackButton("/");
  // Form states
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  // 🔹 Alert helper
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert({ type: "", msg: "" }), 3000);
  };

  // 🔹 Step 1: Send OTP
  const sendOTP = async (e) => {
    e.preventDefault(); // prevent reload
    if (!email) return showAlert("danger", "Please enter your email address.");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/send-otp",
        { email }
      );

      showAlert("success", data?.message || "OTP sent to your email.");
      setTimeout(() => setStep(2), 1000); // Go to OTP step after success
    } catch (err) {
      showAlert("danger", err?.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return showAlert("danger", "Please enter the OTP.");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        { email, otp }
      );

      showAlert("success", data?.message || "OTP verified successfully.");
      setTimeout(() => setStep(3), 1000);
    } catch (err) {
      showAlert("danger", err?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 3: Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirm)
      return showAlert("danger", "Please fill all fields.");
    if (password !== confirm)
      return showAlert("danger", "Passwords do not match.");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        { email, password }
      );

      showAlert("success", data?.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      showAlert("danger", "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-4 mt-3">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Forgot Password</h5>
          <button onClick={handleBack} className="btn btn-primary px-3">
            <i className="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0">
                  {step === 1 && "Forgot Password"}
                  {step === 2 && "Verify OTP"}
                  {step === 3 && "Reset Password"}
                </h5>
              </div>

              {alert.msg && (
                <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
              )}

              {/* Step 1: Enter Email */}
              {step === 1 && (
                <form onSubmit={sendOTP}>
                  <p className="text-muted mb-3">
                    Enter your registered email to receive an OTP for password
                    reset.
                  </p>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {/* Step 2: Verify OTP */}
              {step === 2 && (
                <form onSubmit={verifyOTP}>
                  <p className="text-muted mb-3">
                    Enter the OTP sent to <strong>{email}</strong>.
                  </p>

                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-link w-100 mt-2"
                  >
                    Change Email
                  </button>
                </form>
              )}

              {/* Step 3: Reset Password */}
              {step === 3 && (
                <form onSubmit={resetPassword}>
                  <p className="text-muted mb-3">
                    Create a new password for your account.
                  </p>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}

              <div className="text-center mt-3">
                <small className="text-muted">
                  Remembered your password?{" "}
                  <span
                    role="button"
                    onClick={() => navigate("/login")}
                    className="text-primary text-decoration-underline"
                  >
                    Sign in
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
