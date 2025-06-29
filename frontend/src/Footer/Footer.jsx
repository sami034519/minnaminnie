import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../images/minnaminnilogo-removebg-preview.png";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className=" text-center bg-gradient-to-b to-pink-50 from-purple-50 text-gray-800 py-10 px-4">
      {/* Logo */}
      <div data-aos="fade-up">
        <NavLink
          to="/"
          className=" w-full flex justify-center text-4xl font-extrabold text-gray-900"
        >
          <img src={logo} className="max-w-[100px]" alt="" />
        </NavLink>
      </div>

      {/* Role Title */}
      <div data-aos="fade-up" data-aos-delay="100" className="mt-4">
        <h2 className="text-xl font-extrabold">
          <span className="text-myPink">MINNA</span>{" "}
          <span className="text-mypurple">MINNIE</span>
        </h2>
        <p className="max-w-xl mx-auto text-xs mt-2 text-gray-500">
          MINNAMINNIE is a lovingly crafted baby products website offering a
          wide range of high-quality items including garments, toys,
          accessories, shoes, and more. Designed with care and built using
          modern web technologies.
        </p>
      </div>

      {/* Social Links */}
      <div
        className="flex justify-center gap-5 mt-6 text-2xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 transition"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 transition"
        >
          <FaYoutube />
        </a>
      </div>

      {/* Bottom Line */}
      <div
        className="mt-10 border-t border-gray-400 pt-4 text-sm text-gray-700 flex flex-col md:flex-row justify-between items-center gap-2"
        
        data-aos-delay="300"
      >
        <p>© {new Date().getFullYear()} Sami Ullah. All rights reserved.</p>
        <div className="flex gap-4">
          <NavLink to="/privacy" className="hover:underline">
            Privacy-Policy
          </NavLink>
          <NavLink to="/terms" className="hover:underline">
            Terms and Conditions
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
