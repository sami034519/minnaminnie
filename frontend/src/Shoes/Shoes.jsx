import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import sh1 from "../images/shoe1.jpg";
import sh2 from "../images/shoe2.webp";
import sh3 from "../images/shoe3.jpg";
import sh4 from "../images/shoe4.jpg";
import sh5 from "../images/shoe5.jpg";
import sh6 from "../images/shoe6.jpg";
import AOS from "aos";

const shoeProducts = [
  {
    id: 1,
    title: "Boys Sneakers - Navy Blue",
    image: sh1,
    price: 2599,
    discountPrice: 2099,
    sale: true,
  },
  {
    id: 2,
    title: "Girls Glitter Pumps - Pink Shine",
    image: sh2,
    price: 2399,
    discountPrice: 1899,
    sale: true,
  },
  {
    id: 3,
    title: "Unisex Slip-ons - Grey Sport",
    image: sh3,
    price: 1999,
    discountPrice: 1599,
    sale: false,
  },
  {
    id: 4,
    title: "Kids Velcro Sandals - Black",
    image: sh4,
    price: 1399,
    discountPrice: 1199,
    sale: false,
  },
  {
    id: 5,
    title: "Girls Ballerina Flats - Purple Charm",
    image: sh5,
    price: 2199,
    discountPrice: 1799,
    sale: true,
  },
  {
    id: 6,
    title: "Kids Canvas Shoes (2 Pack) - Multicolor",
    image: sh6,
    price: 1899,
    discountPrice: 1499,
    sale: false,
  },
];

const KidsShoes = () => {
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
    setIndex((prev) =>
      prev === 0 ? shoeProducts.length - visibleCount : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % shoeProducts.length);
  };

  const visibleProducts = [...shoeProducts, ...shoeProducts].slice(
    index,
    index + visibleCount
  );

  return (
    <div className="w-full lg:py-12 mb-10 lg:my-10">
      {/* Section Title */}
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          KIDS SHOES
        </h1>
      </div>

      {/* Product Carousel */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={prevSlide}
          className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
        >
          <FaChevronLeft />
        </button>

        <div className="flex gap-4 overflow-hidden">
          {visibleProducts.map((product, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={product.id}
                className={`relative bg-white rounded-md shadow w-[260px] flex flex-col transition-transform duration-500 ${
                  isActive ? "scale-105 z-10" : "scale-100"
                }`}
              >
                {product.sale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                    SALE
                  </div>
                )}

                <NavLink to={`/product/${product.id}`} data-aos="fade-left">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain rounded-t-md"
                  />
                </NavLink>

                <div className="p-2 text-xs text-center">
                  <h3 className="font-medium text-gray-800">{product.title}</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <p className="text-gray-400 line-through text-sm">
                      Rs.{product.price.toLocaleString()}
                    </p>
                    <p className="text-pink-600 font-semibold text-sm">
                      Rs.{product.discountPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* View All */}
      <div className="text-center mt-6">
        <NavLink to="/shoes">
          <button className="bg-mypurple hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2">
            VIEW ALL <FaChevronRight size={14} />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default KidsShoes;
