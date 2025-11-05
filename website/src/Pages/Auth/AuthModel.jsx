import React, { useState, useEffect, useRef, useContext } from "react";
import { User, LogOut, Box } from "lucide-react";
import SignInModal from "../SignIn/SignInModal";
import SignUpModal from "../SignUp/SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logoutUser } = useContext(AppContext);

  // 🔹 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  const openSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  const openForgotPassword = () => {
    setIsSignInOpen(false);
    setIsForgotOpen(true);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleProfile = () => navigate("/profile");
  const handleSet = () => navigate("/allorder");

  // 🔹 Avatar UI (Tailwind Only)
  const renderAvatar = () => {
    if (user?.imageUrl) {
      return (
        <img
          src={user.imageUrl}
          alt={user.username}
          className="w-8 h-8 rounded-full object-cover border border-gray-300 hover:border-blue-400 transition-all"
        />
      );
    } else if (user?.username) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔹 Auth Button */}
      <div className="w-full flex justify-center sm:justify-end">
        <button
          onClick={!user ? openSignIn : toggleDropdown}
          className="flex items-center justify-center gap-2
                     bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     transition-all duration-200
                     w-full py-2 rounded-md 
                     sm:w-10 sm:h-10 sm:rounded-full sm:py-0 sm:px-0"
        >
          {renderAvatar()}
          <span className="block sm:hidden font-medium">
            {user ? user.username : "Sign In"}
          </span>
        </button>
      </div>

      {/* 🔹 Dropdown Menu */}
      {dropdownOpen && user && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
          <ul className="py-2">
            <li
              onClick={() => {
                handleProfile();
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </li>

            <li
              onClick={() => {
                handleSet();
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Box className="w-5 h-5" />
              <span>Orders</span>
            </li>

            <li
              onClick={() => {
                logoutUser();
                setDropdownOpen(false);
                navigate("/products");
              }}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}

      {/* 🔹 Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        openSignUp={openSignUp}
        openForgotPassword={openForgotPassword}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        openSignIn={openSignIn}
      />
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </div>
  );
};

export default AuthModal;
