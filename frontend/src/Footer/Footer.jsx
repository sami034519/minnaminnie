import React from "react";
import { NavLink } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-myPink text-gray-800 pt-10 pb-6 px-4 md:px-20">
      <div className="grid md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-pink-600 mb-3">MINNAMINNIE</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for adorable baby garments, educational toys, and quality sportswear. We bring comfort, joy, and style to every child's world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-pink-700 mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/privacy" className="hover:text-pink-500 transition">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-pink-500 transition">Terms & Conditions</NavLink></li>
            <li><NavLink to="/returns" className="hover:text-pink-500 transition">Return & Refund</NavLink></li>
            <li><NavLink to="/shipping" className="hover:text-pink-500 transition">Shipping Policy</NavLink></li>
          </ul>
        </div>

       

        {/* Contact Info & Social Links */}
        <div>
          <h2 className="text-lg font-semibold text-pink-700 mb-3">Contact Us</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><FaPhoneAlt className="text-pink-500" /> +92 300 1234567</li>
            <li className="flex items-center gap-3"><FaEnvelope className="text-pink-500" /> info@minnaminnie.com</li>
            <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-pink-500" /> Lahore, Pakistan</li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-4 mt-5 text-xl ">
            <a href="https://www.facebook.com/minnaminnie" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/minnaminnie" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition text-red-600">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/minnaminnie" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition text-blue-500">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/@minnaminnie" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition text-red-500">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-white pt-4 text-center font-medium text-sm text-pink-700">
        © {new Date().getFullYear()} MINNAMINNIE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
