import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-teal-400">Spark Academy</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Empowering education through innovative class management solutions. 
              Join us to ignite your learning journey!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-teal-400 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-teal-400 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-teal-400 transition duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-teal-400 transition duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
            <div className="flex space-x-4 text-2xl mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition duration-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition duration-300">
                <FaLinkedin />
              </a>
            </div>

            {/* Newsletter Signup */}
            <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full p-2 bg-gray-800 text-white outline-none placeholder-gray-400"
              />
              <button className="bg-teal-500 px-4 py-2 text-white font-semibold hover:bg-teal-600 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>&copy; {new Date().getFullYear()} Spark Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
