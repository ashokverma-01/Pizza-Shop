import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Home1 from "../../assets/h1.jpg";
import Home2 from "../../assets/h2.jfif";
import Home3 from "../../assets/h3.jfif";
import Home4 from "../../assets/h4.jpg";
import Home5 from "../../assets/h5.jfif";
import { useNavigate } from "react-router-dom";

const carouselData = [
  {
    id: 1,
    image: Home1,
    alt: "Ice-Cream",
    text: "Indulge in our creamy and delicious ice-cream treats",
    buttonText: "Buy Ice-Cream",
  },
  {
    id: 2,
    image: Home2,
    alt: "Burger",
    text: "Savor the juiciest burgers, freshly made for you",
    buttonText: "Buy Burger",
  },
  {
    id: 3,
    image: Home3,
    alt: "Pizza",
    text: "Enjoy hot, cheesy pizza straight from the oven",
    buttonText: "Buy Pizza",
  },
  {
    id: 4,
    image: Home4,
    alt: "Gol-Gappa",
    text: "Relish crispy and spicy Gol-Gappas with tangy water",
    buttonText: "Try Gol-Gappa",
  },
  {
    id: 5,
    image: Home5,
    alt: "Pasta",
    text: "Delight in creamy, flavorful pasta cooked to perfection",
    buttonText: "Buy Pasta",
  },
];

const CarouselModel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  const nextSlide = useCallback(() => {
    setIsTextVisible(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      setIsTextVisible(true);
    }, 500);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTextVisible(false);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + carouselData.length) % carouselData.length
      );
      setIsTextVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  const handleProducts = () => {
    navigate("/products");
  };

  return (
    <div
      className="relative w-full h-96 md:h-[70vh] overflow-hidden rounded"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {carouselData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-center transition-opacity duration-500 ease-in-out ${
                isTextVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.text}
            </h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={handleProducts}
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-black text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-black text-2xl" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselModel;
