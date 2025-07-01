import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserShield, FaLock, FaRegClock } from "react-icons/fa";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1
        className="text-3xl font-bold text-center text-mypurple mb-6"
        data-aos="fade-down"
      >
        <FaUserShield className="inline mr-2" />
        Privacy Policy
      </h1>

      <section className="space-y-6 text-sm md:text-base leading-relaxed">
        <p data-aos="fade-up">
          At <span className="font-semibold text-myPink">MINNA & MINNIE</span>,
          we are committed to protecting your privacy. This Privacy Policy
          outlines how we collect, use, and safeguard your personal information
          when you interact with our website and services.
        </p>

        <div data-aos="fade-up" className="space-y-2">
          <h2 className="text-lg font-semibold text-myPink">
            <FaLock className="inline mr-1" />
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Name, email, phone number, and delivery address</li>
            <li>Order and purchase details</li>
            <li>Messages or queries submitted via our forms</li>
          </ul>
        </div>

        <div data-aos="fade-up" className="space-y-2">
          <h2 className="text-lg font-semibold text-myPink">
            <FaRegClock className="inline mr-1" />
            How We Use Your Data
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>To process and deliver your orders</li>
            <li>To contact you for order updates or promotions</li>
            <li>To improve user experience on our website</li>
          </ul>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-lg font-semibold text-myPink">Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored securely and is
            not shared with third parties except for order processing.
          </p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-lg font-semibold text-myPink">Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience.
            Cookies help us remember and process the items in your cart and
            understand your preferences for future visits.
          </p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-lg font-semibold text-myPink">Your Consent</h2>
          <p>
            By using our site, you consent to our privacy policy. If you do not
            agree with our policies, please refrain from using our website.
          </p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-lg font-semibold text-myPink">Contact Us</h2>
          <p>
            For questions regarding your privacy or personal data, please
            contact us at{" "}
            <a
              href="mailto:minnaandminnie4u@gmail.com"
              className="text-mypurple underline"
            >
              minnaandminnie4u@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
