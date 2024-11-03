// src/pages/Home.jsx
import React, { useEffect, useRef } from 'react';
import Jwel from '../assets/Images/jwel.png';
import bg2 from '../assets/Images/bg2.jpeg';
import Neck from '../assets/Images/Necklace.jpg';
import Ring from '../assets/Images/Ring.jpg';
import Scrun from '../assets/Images/Scrunchy.jpg';
import Brace from '../assets/Images/Bracelets.jpg';
import { NavLink } from 'react-router-dom';

// Category component for rendering each category item
const CategoryItem = ({ refProp, index, imgSrc, title }) => {
  return (
    <NavLink to={`/category/${title.toLowerCase()}`} ref={refProp} data-index={index} className="bg-black w-full md:w-1/4 md:h-[25vw] relative cursor-pointer">
      <img src={imgSrc} alt={title} className="aspect-square w-full h-full opacity-80 transition-opacity duration-300 hover:opacity-100" />
      <p className="absolute inset-0 flex justify-center text-white text-xl md:mt-10 mt-10 font-semibold">{title}</p>
    </NavLink>
  );
};

const Home = () => {
  const categoryRefs = useRef([]);

  // Set up the Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          entry.target.classList.add(index % 2 === 0 ? 'animate-fade-left' : 'animate-fade-right');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    categoryRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="h-[80vh] w-screen flex items-center justify-center bg-black relative">
        <div className="flex flex-col md:flex-row items-center justify-center h-auto w-full px-6 md:px-20 max-w-screen-xl mx-auto">
          <div className="flex-shrink-0 transform -translate-x-2 animate-fade-left">
            <img src={Jwel} className="h-auto max-h-[70vh] w-auto border-spacing-0" alt="Jewelry" />
          </div>
          <div className="mt-6 md:mt-0 md:ml-10 bg-black flex flex-col items-start justify-center h-full animate-fade-right p-4 md:p-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#b7a98b] mb-4">
              Premium Jewelry for Every Occasion
            </h1>
            <p className="text-white text-md md:text-lg leading-relaxed">
              Discover our exclusive range of premium jewelry, crafted to perfection for all your special moments. From timeless classics to modern designs, each piece adds elegance to your style.
            </p>
            <NavLink to="/product" className="mt-6 inline-block bg-[#b7a98b] text-black py-2 px-6 rounded-md font-semibold shadow-lg transition-transform transform hover:scale-105">
              <p>Find Out More</p>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-white w-screen block md:flex space-y-4 md:space-y-0">
        <CategoryItem refProp={(el) => (categoryRefs.current[0] = el)} index={0} imgSrc={Ring} title="Rings" />
        <CategoryItem refProp={(el) => (categoryRefs.current[1] = el)} index={1} imgSrc={Neck} title="Necklace" />
        <CategoryItem refProp={(el) => (categoryRefs.current[2] = el)} index={2} imgSrc={Scrun} title="Scrunchy" />
        <CategoryItem refProp={(el) => (categoryRefs.current[3] = el)} index={3} imgSrc={Brace} title="Bracelets" />
      </div>

      {/* About Brand */}
      <div className="bg-black h-[50vh] relative">
        <img src={bg2} alt="About Brand" className="h-full w-full opacity-80 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <p className="text-white text-2xl md:text-4xl font-extrabold tracking-widest uppercase">We are Gozelia</p>
          <p className="text-white text-lg md:text-2xl font-light mt-2">Your trusted partner in premium jewelry</p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-screen min-h-[12vh] py-6 text-center bg-black">
        <p className="text-white opacity-80 text-sm md:text-base">© 2024 Created by Mohd Hamdaan Ansari | All Rights Reserved | GOZELIA</p>
      </div>
    </>
  );
};

export default Home;
