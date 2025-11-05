import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(AppContext);

  return (
    <motion.button
      onClick={toggleLanguage}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-md 
      ${
        language === "en"
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          : "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900"
      }`}
    >
      <Languages
        className={`w-5 h-5 ${
          language === "en" ? "text-white" : "text-gray-800"
        }`}
      />
      <span className="font-semibold text-sm tracking-wide">
        {language === "en" ? "हिंदी" : "English"}
      </span>

      {/* Animated Indicator Dot */}
      <motion.span
        layout
        className={`absolute top-1 right-1 w-3 h-3 rounded-full shadow-inner ${
          language === "en" ? "bg-green-400" : "bg-blue-500"
        }`}
      />
    </motion.button>
  );
};

export default LanguageToggle;
