import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTshirt, FaGift, FaGamepad, FaBaby, FaShoePrints } from "react-icons/fa";

const TermsAndConditions = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-myPink mb-8" data-aos="fade-down">
        Terms & Conditions
      </h1>

      <section data-aos="fade-up">
        <p className="mb-4 text-sm">
          Welcome to <strong>Minna & Minnie</strong>! By using our website and services, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Orders and Payment</h2>
        <p className="mb-4 text-sm">
          All orders are subject to product availability and confirmation of the order price. We accept various payment methods via PayFast.
        </p>

        <h2 className="text-lg font-semibold mb-2">2. Delivery</h2>
        <p className="mb-4 text-sm">
          Orders are typically delivered within 3–5 working days. Delays may occur during public holidays or due to unforeseen circumstances.
        </p>

        <h2 className="text-lg font-semibold mb-2">3. Returns & Exchanges</h2>
        <p className="mb-4 text-sm">
          Products can be exchanged within 7 days if unused and in original packaging. Return shipping is the customer's responsibility.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Product Categories</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-2">
          <li className="flex items-center gap-2"><FaTshirt className="text-mypurple" /> Baby Garments</li>
          <li className="flex items-center gap-2"><FaGift className="text-mypurple" /> Accessories</li>
          <li className="flex items-center gap-2"><FaGamepad className="text-mypurple" /> Toys</li>
          <li className="flex items-center gap-2"><FaBaby className="text-mypurple" /> Sport Wears</li>
          <li className="flex items-center gap-2"><FaShoePrints className="text-mypurple" /> Baby Shoes</li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-2">5. Contact</h2>
        <p className="text-sm">
          For any queries, please email us at <a href="mailto:minnaandminnie4u@gmail.com" className="text-myPink underline">minnaandminnie4u@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
