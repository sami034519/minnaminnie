import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import herovideo from "../videos/Toysvideo.mp4";
import { NavLink } from "react-router-dom";
import t1 from "../images/t1animal.jpg";
import t2 from "../images/t2counting.jpg";
import t3 from "../images/t3duck.jpg";
import t4 from "../images/t4teadybear.jpg";
import t5 from "../images/t5boxes.jpg";
import t6 from "../images/t6tractors.jpg";
import AOS from "aos";

const toys = [
  {
    id: 1,
    title: "MINI ANIMALS",
    image: t1,
    price: 1299,
    discountPrice: 899,
    sale: true,
  },
  {
    id: 2,
    title: "Colorful Building Blocks Set",
    image: t2,
    price: 1699,
    discountPrice: 1199,
    sale: false,
  },
  {
    id: 3,
    title: "MINI DUCKS - Brown",
    image: t3,
    price: 1499,
    discountPrice: 999,
    sale: true,
  },
  {
    id: 4,
    title: "MINI TEADY BEARS",
    image: t4,
    price: 899,
    discountPrice: 699,
    sale: false,
  },
  {
    id: 5,
    title: "Educational Wooden Puzzle Board",
    image: t5,
    price: 1199,
    discountPrice: 799,
    sale: true,
  },
  {
    id: 6,
    title: "BABY TRACTORS",
    image: t6,
    price: 599,
    discountPrice: 499,
    sale: false,
  },
];

const ToysSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(2);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? toys.length - visibleCount : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % toys.length);
  };

  const visibleToys = [...toys, ...toys].slice(index, index + visibleCount);

  return (
    <>
      <div className="relative w-full h-auto lg:h-screen overflow-hidden animate__animated animate__zoomIn">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        <video
          className="w-full h-full object-contain lg:object-cover"
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay content */}
        <div className="absolute bottom-10 w-full z-20 flex items-center justify-center text-white text-center px-4">
          <div>
            <NavLink>
              <button className="border-[3px] px-3 py-1 mt-3 border-white">
                SHOP NOW
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full my-10 py-8">
        {/* Heading */}
        <div
          className="flex justify-center space-x-4 mb-6"
          data-aos="fade-down"
        >
          <button className="text-3xl mb-5 font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            TOYS COLLECTION
          </button>
        </div>

        {/* Slider */}
        <div className="flex items-center justify-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
          >
            <FaChevronLeft />
          </button>

          {/* Products */}
          <div className="flex gap-4 overflow-hidden">
            {visibleToys.map((toy, idx) => {
              const isActive = idx === 0;
              return (
                <div
                  key={toy.id}
                  className={`relative bg-white rounded-md shadow h-[300px] w-[260px] flex flex-col transition-transform duration-500 ${
                    isActive ? "scale-105 z-10" : "scale-100"
                  }`}
                >
                  {toy.sale && (
                    <div className="absolute top-2 left-2  overflow-hidden bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                      SALE
                    </div>
                  )}

                  <NavLink to={`/product/${toy.id}`} className="bg-black" data-aos="fade-left">
                    <img
                      src={toy.image}
                      alt={toy.title}
                      className="w-full bg-slate-50 h-[200px] max-h-56 object-cover rounded-t-md"
                    />
                  </NavLink>

                  <div className="p-2 text-xs text-center">
                    <h3 className="font-medium text-gray-800">{toy.title}</h3>
                    <div className="flex justify-center items-center gap-2 mt-1">
                      <p className="text-gray-400 line-through text-sm">
                        Rs.{toy.price.toLocaleString()}
                      </p>
                      <p className="text-pink-600 font-semibold text-sm">
                        Rs.{toy.discountPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button className="bg-mypurple hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2">
            VIEW ALL <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ToysSection;
