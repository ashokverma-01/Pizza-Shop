import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTimes,
  FaShareAlt,
} from "react-icons/fa";

const SocialSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="fixed top-1/3 right-0 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`flex items-center justify-center w-9 h-9 
        bg-blue-600 dark:bg-blue-500 text-white rounded-l-lg 
        hover:bg-blue-700 dark:hover:bg-blue-400 
        shadow-lg transition-all duration-300`}
      >
        {open ? <FaTimes size={18} /> : <FaShareAlt size={18} />}
      </button>

      {/* Social Icons */}
      <div
        className={`flex flex-col items-center gap-4 mt-4 bg-white dark:bg-gray-800 
        p-3 rounded-l-lg shadow-lg transition-all duration-500 
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} `}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:scale-110 transition-transform"
        >
          <FaWhatsapp size={20} />
        </a>
        {/* Facebook */}
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:scale-110 transition-transform"
        >
          <FaFacebookF size={20} />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:scale-110 transition-transform"
        >
          <FaInstagram size={20} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:scale-110 transition-transform"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </div>
  );
};

export default SocialSidebar;
