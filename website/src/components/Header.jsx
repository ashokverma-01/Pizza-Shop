import React, { useContext, useState } from "react";
import { Menu, X, ShoppingCart, Heart, Store } from "lucide-react";
import ThemeToggle from "../utils/ThemeToggle";
import AuthModal from "../Pages/Auth/AuthModel";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import SignInModal from "../Pages/SignIn/SignInModal";
import Logo from "../../assets/logo.jpg";
import LanguageToggle from "../utils/LanguageToggle";

const Header = () => {
  const { cart, user, wishlist } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWishlistClick = (e) => {
    e.preventDefault();

    if (!user) {
      setIsSignInOpen(true);
    } else {
      navigate("/wishlist");
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!user) {
      setIsSignInOpen(true);
    } else {
      navigate("/cart");
    }
  };
  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <header className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  shadow-md sticky top-0 z-50 transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200  dark:hover:text-blue-400 cursor-pointer"
              onClick={handleHomePage}
            >
              <img src={Logo} className="w-9 h-9  rounded-full" />

              <span className="text-2xl font-bold text-gray-800 dark:text-white dark:hover:text-blue-400">
                Pizza Shop
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {["Home", "About", "Contact", "Products"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <LanguageToggle />
              <ThemeToggle />

              {/* Wishlist */}
              <button
                onClick={handleWishlistClick}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {user && wishlist?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {user && cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <AuthModal />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 transition-colors">
              <div className="flex flex-col space-y-4">
                {["Home", "About", "Contact", "Products"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}

                {/* Mobile Right Icons */}
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <LanguageToggle />
                  <ThemeToggle />

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistClick}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Heart className="w-6 h-6" />
                    {wishlist?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </button>

                  {/* Cart */}
                  <button
                    onClick={handleCartClick}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cart?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </div>

                <AuthModal />
              </div>
            </div>
          )}
        </nav>
      </header>
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
};

export default Header;
