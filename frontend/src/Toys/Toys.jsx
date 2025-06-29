import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import herovideo from "../videos/Toysvideo.mp4";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice"; // ✅ adjust the path if needed
import t1 from "../images/t1animal-removebg-preview.png";
import t2 from "../images/t5racingcar.webp";
import t3 from "../images/t3duck__2_-removebg-preview.png";
import t4 from "../images/t4teadtbear1-removebg-preview.png";
import t5 from "../images/t5boxes.png";
import t6 from "../images/t6tractor-removebg-preview.png";
import AOS from "aos";

const toys = [
  {
    id: 41,
    title: "Mini Animal Toy Set Pack",
    image: t1,
    price: 1299,
    discountPrice: 899,
    sale: true,
  },
  {
    id: 42,
    title: "Colorful Advanced Racing-Cars",
    image: t2,
    price: 1699,
    discountPrice: 1199,
    sale: false,
  },
  {
    id: 43,
    title: "Mini Ducks Toy Set Brown",
    image: t3,
    price: 1499,
    discountPrice: 999,
    sale: true,
  },
  {
    id: 44,
    title: "Mini Teddy Bear Soft Set",
    image: t4,
    price: 899,
    discountPrice: 699,
    sale: false,
  },
  {
    id: 45,
    title: "Educational Wooden Puzzle Board",
    image: t5,
    price: 1199,
    discountPrice: 799,
    sale: true,
  },
  {
    id: 46,
    title: "Baby Tractor Toy Vehicle Set",
    image: t6,
    price: 599,
    discountPrice: 499,
    sale: false,
  },
];

const ToysSection = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 4 : 2);
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

  const handleAddToCart = (toy) => {
    dispatch(addToCart(toy));
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-auto lg:h-[60vh] overflow-hidden animate__animated animate__zoomIn">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <video
          className="w-full h-full object-contain lg:object-cover"
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute bottom-10 w-full z-20 flex items-center justify-center text-white text-center px-4">
          <div>
            <NavLink>
              <button className="border-[3px]  px-3 py-1 mt-3 border-white">
                SHOP NOW
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Toys Section */}
      <div className="w-full my-10 py-8">
        <div
          className="flex justify-center space-x-4 mb-6"
          data-aos="fade-down"
        >
          <button className="text-3xl  mb-5 font-extrabold text-myPink ">
            TOYS COLLECTION
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
          >
            <FaChevronLeft />
          </button>

          {/* Toy Cards */}
          <div className="flex gap-4 overflow-hidden">
            {visibleToys.map((toy, idx) => {
              const isActive = idx === 0;
              return (
                <div
                  key={toy.id}
                  className={`relative bg-white rounded-md shadow h-[330px] w-[260px] flex flex-col transition-transform duration-500 ${
                    isActive ? "scale-100 z-10" : "scale-100"
                  }`}
                >
                  {toy.sale && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                      SALE
                    </div>
                  )}

                  <NavLink to={`/product/${toy.id}`} data-aos="fade-left">
                    <img
                      src={toy.image}
                      alt={toy.title}
                      className="bg-slate-100 w-60 h-48 lg:object-contain object-contain rounded-t-md"
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
                    <button
                      onClick={() => handleAddToCart(toy)}
                      className="mt-2 text-white bg-pink-600 hover:bg-pink-700 text-xs py-1 px-3 rounded flex items-center justify-center gap-2"
                    >
                      <FaCartPlus size={14} /> Add to Cart
                    </button>
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

        {/* View All */}
        <div className="text-center mt-4 lg:mt-6">
          <button
            className="bg-mypurple lg:w-[30%] w-[80%] justify-center hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2"
            data-aos="fade-right"
          >
            VIEW ALL <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ToysSection;
