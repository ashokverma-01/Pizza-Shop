import React from "react";
import CarouselModel from "../../utils/CarouselModel";
import Product from "../Product/Product";
import About from "../About/About";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <CarouselModel />
      <Product />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
