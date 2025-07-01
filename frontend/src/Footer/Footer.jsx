import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="text-center bg-gradient-to-b to-pink-50 from-purple-50 text-gray-800 py-10 px-4">
      {/* Logo */}
      <div data-aos="fade-up">
        <NavLink
          to="/"
          className="w-full flex justify-center text-4xl font-extrabold text-gray-900"
        >
          <img
            src="/images/minnalogo.png"
            className="max-w-[120px]"
            alt="Minna Minnie Logo"
          />
        </NavLink>
      </div>

      {/* Brand Name */}
      <div data-aos="fade-up" data-aos-delay="100" className="mt-1">
        <h2 className="text-xl font-extrabold">
          <span className="text-myPink">MINNA</span>{" "}
          <span className="text-black">&</span>{" "}
          <span className="text-mypurple">MINNIE</span>
        </h2>
        <p className="max-w-xl mx-auto text-xs mt-2 text-gray-500">
          MINNAMINNIE is a lovingly crafted baby products website offering a
          wide range of high-quality items including garments, toys,
          accessories, shoes, and more. Designed with care and built using
          modern web technologies.
        </p>
      </div>

      {/* Contact Info */}
      <div
        className="mt-6 lg:flex-row flex-col justify-items-center justify-center lg:gap-6 text-sm text-gray-700"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <a href="tel:03328205786" className="flex items-center gap-2 hover:underline">
          <FaPhoneAlt className="text-pink-600" />
          0332 8205786
        </a>
        <a href="mailto:minnaandminnie4u@gmail.com" className="flex lg:mt-0 mt-2 items-center gap-2 hover:underline">
          <FaEnvelope className="text-mypurple" />
          minnaandminnie4u@gmail.com
        </a>
      </div>

      {/* Social Media Icons */}
      <div
        className="flex justify-center gap-5 mt-6 text-2xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 transition hover:scale-110"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 transition hover:scale-110"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 transition hover:scale-110"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 transition hover:scale-110"
        >
          <FaYoutube />
        </a>
      </div>

      {/* Bottom Line */}
      <div
        className="mt-10 border-t border-gray-300 pt-4 text-sm text-gray-700 flex flex-col md:flex-row justify-between items-center gap-2"
      >
        <p>© {new Date().getFullYear()} Sami Ullah. All rights reserved.</p>
        <div className="flex gap-4">
          <NavLink to="/privacy" className="hover:underline">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms" className="hover:underline">
            Terms & Conditions
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
