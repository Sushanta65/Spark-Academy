import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <Helmet>
        <title>About Us | Spark Academy</title>
      </Helmet>
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-xl p-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-teal-700 mb-6">Empowering Education for the Future</h2>
          <p className="text-gray-600 leading-relaxed">
            Spark Academy is dedicated to transforming education by leveraging technology to make learning more accessible, engaging, and effective. Our platform empowers students, educators, and institutions with cutting-edge tools designed for a modern learning experience.
          </p>
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            <button className="bg-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-800 transition">Join Us</button>
            <button className="border border-teal-700 text-teal-700 px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 hover:text-white transition">Learn More</button>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-teal-700 text-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>Providing top-tier educational resources and fostering a lifelong learning culture.</p>
          </div>
          <div className="p-6 bg-teal-700 text-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>Revolutionizing education with cutting-edge technology and interactive learning.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
