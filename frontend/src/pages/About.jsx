// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 lg:p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">About Gozelia</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
          Welcome to Gozelia, your premier online destination for stunning jewelry! We are passionate about delivering an exceptional shopping experience for jewelry lovers, offering a wide selection of beautifully crafted pieces designed to complement every style and occasion.
        </p>
        
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-emerald-600 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to bring elegance and style to your jewelry collection with ease. We’re committed to offering top-quality pieces and a seamless online shopping experience, empowering our customers to select jewelry that best reflects their personal style.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-emerald-600 mb-3">About the Developer</h2>
          <p className="text-gray-700 leading-relaxed">
            This website was developed by <span className="font-semibold">Mohd Hamdaan Ansari</span>, a passionate developer dedicated to creating a smooth and enjoyable online shopping experience. For any technical inquiries, feedback, or partnership ideas, feel free to reach out at 
            <a href="mailto:mhamdaan91@gmail.com" className="text-emerald-600 font-medium hover:underline ml-1">mhamdaan91@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-emerald-600 mb-3">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions or need assistance? Reach out through our 
            <Link to="/contact" className="text-emerald-600 font-medium hover:underline ml-1">Contact Us</Link> page. We’re here to help you find the perfect piece!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
