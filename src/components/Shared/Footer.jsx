import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content my-10">
      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-6 mb-6">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-3xl font-bold text-teal-400">Spark Academy</h2>
            <p className="mt-2 text-center lg:text-left text-gray-300">
              Empowering education through innovative class management
              solutions. Join us to ignite your learning journey!
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold text-lg mb-3 text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-teal-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-teal-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-teal-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-teal-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-3 text-gray-100">
              Follow Us
            </h3>
            <div className="flex space-x-4 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Spark Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
