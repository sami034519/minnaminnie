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
import logo from "../images/minnaminnilogo.jpg"

const Footer = () => {
  return (
    <footer className="bg-myPink text-black pt-10 pb-6 px-4 md:px-20">
      <div className="grid md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <NavLink to="/" className="text-2xl max-w-[150px] rounded font-bold text-white mb-3 inline-block hover:text-pink-400">
            <img src={logo} alt="" className="rounded-xl" />
          </NavLink>
          <p className="text-sm">
            Your one-stop shop for adorable baby garments, educational toys, and quality sportswear. We bring comfort, joy, and style to every child's world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/privacy" className="hover:underline">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:underline">Terms & Conditions</NavLink></li>
            <li><NavLink to="/returns" className="hover:underline">Return & Refund</NavLink></li>
            <li><NavLink to="/shipping" className="hover:underline">Shipping Policy</NavLink></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Shop Categories</h2>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/baby-garments" className="hover:underline">Baby Garments</NavLink></li>
            <li><NavLink to="/toys" className="hover:underline">Toys</NavLink></li>
            <li><NavLink to="/sportswear" className="hover:underline">Sportswear</NavLink></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt /> +92 300 1234567</li>
            <li className="flex items-center gap-2"><FaEnvelope /> info@minnaminnie.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Lahore, Pakistan</li>
          </ul>

          {/* Social Media */}
         <div className="flex gap-4 mt-4 text-white text-xl">
  <a
    href="https://www.facebook.com/minnaminnie"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500"
  >
    <FaFacebookF />
  </a>
  <a
    href="https://www.instagram.com/minnaminnie"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500"
  >
    <FaInstagram />
  </a>
  <a
    href="https://twitter.com/minnaminnie"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500"
  >
    <FaTwitter />
  </a>
  <a
    href="https://www.youtube.com/@minnaminnie"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500"
  >
    <FaYoutube />
  </a>
</div>

        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center font-medium text-sm text-white">
        © {new Date().getFullYear()} MINNAMINNIE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
