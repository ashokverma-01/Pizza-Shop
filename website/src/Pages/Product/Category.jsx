import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AppContext from "../../Context/AppContext";

// ✅ Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg z-20"
  >
    <FaArrowRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg z-20"
  >
    <FaArrowLeft size={18} />
  </button>
);

const Category = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const { categories } = useContext(AppContext);

  // ✅ Fix for refresh issue (detect screen width)
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(2);
      else if (width < 1280) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  relative">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-10">
          Our <span className="text-blue-600">Category</span>
        </h2>

        {/* ✅ Slider Section */}
        <div className="relative">
          <Slider {...settings}>
            {categories.map((member, idx) => (
              <div key={idx} className="px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Category;
