import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900   sm:px-8">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={Logo}
                className="w-10 h-10 rounded-full shadow-md"
                alt="Pizza Shop Logo"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Pizza Shop
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Freshly baked. Quickly delivered. Always delicious.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:scale-110 hover:opacity-80 transition-transform duration-200"
              >
                <FaWhatsapp size={22} />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:scale-110 hover:opacity-80 transition-transform duration-200"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:scale-110 hover:opacity-80 transition-transform duration-200"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:scale-110 hover:opacity-80 transition-transform duration-200"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeIn delay-100">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-5 relative after:content-[''] after:w-12 after:h-0.5 after:bg-blue-600 after:block after:mt-1">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Products", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-fadeIn delay-200">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-5 relative after:content-[''] after:w-12 after:h-0.5 after:bg-blue-600 after:block after:mt-1">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Shipping Info",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400  text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeIn delay-300">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-5 relative after:content-[''] after:w-12 after:h-0.5 after:bg-blue-600 after:block after:mt-1">
              Contact Info
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500  flex-shrink-0 mt-1" />
                <span>84/108 Ward 27, Mansarovar, Jaipur, Rajasthan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>+91-9636366250</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>ak228308@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Pizza Shop. All rights reserved 🍕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
