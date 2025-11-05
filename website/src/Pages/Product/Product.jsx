import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Category from "./Category";
import AppContext from "../../Context/AppContext";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-8 top-1/2 transform -translate-y-1/2 
    bg-blue-600 dark:bg-blue-500 
    text-white p-3 rounded-full 
    hover:bg-blue-700 dark:hover:bg-blue-400 
    shadow-lg z-20 transition-all duration-300"
  >
    <FaArrowRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-8 top-1/2 transform -translate-y-1/2 
    bg-blue-600 dark:bg-blue-500 
    text-white p-3 rounded-full 
    hover:bg-blue-700 dark:hover:bg-blue-400 
    shadow-lg z-20 transition-all duration-300"
  >
    <FaArrowLeft size={18} />
  </button>
);

const Product = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const { products } = useContext(AppContext);

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
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <section className="py-10 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Latest <span className="text-blue-600">Products</span>
        </h1>

        <div className="relative max-w-full mx-auto ">
          <Slider {...settings}>
            {products.map((product, idx) => (
              <div
                key={idx}
                className="px-2 py-2 sm:px-3 md:px-4 bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 "
              >
                <ProductCard {...product} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <Category />
    </>
  );
};

export default Product;
