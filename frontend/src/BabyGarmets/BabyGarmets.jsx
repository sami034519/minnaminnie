import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice"; // Adjust path if needed
import p11 from "../images/p11.jpg";
import p21 from "../images/p21.jpg";
import p31 from "../images/p31.jpg";
import p41 from "../images/p41.jpg";
import p51 from "../images/p51.jpg";
import p61 from "../images/p61.jpg";
import AOS from "aos";

const products = [
  {
    id: 21,
    title: "Infant Girls Cotton Basic Casual Shirt - Blue Check",
    image: p11,
    price: 1395,
    discountPrice: 999,
    sale: true,
  },
  {
    id: 22,
    title: "Infant Boys Cotton Basic Casual Shirt (Roar) - LIGHT-GREEN",
    image: p21,
    price: 1395,
    discountPrice: 1099,
    sale: false,
  },
  {
    id: 23,
    title: "Infant Boys Pajama Set - RED",
    image: p31,
    price: 1499,
    discountPrice: 1199,
    sale: true,
  },
  {
    id: 24,
    title: "Traditional Girls Skirt - Purple",
    image: p41,
    price: 1199,
    discountPrice: 899,
    sale: false,
  },
  {
    id: 25,
    title: "Baby Check Shirt Linings - Soft ",
    image: p51,
    price: 1599,
    discountPrice: 1299,
    sale: true,
  },
  {
    id: 26,
    title: "Boys Casual T-Shirts White (3 Pack)",
    image: p61,
    price: 499,
    discountPrice: 399,
    sale: false,
  },
];

const BabyGarments = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
      prev === 0 ? products.length - visibleCount : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const visibleProducts = [...products, ...products].slice(
    index,
    index + visibleCount
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full py-8 my-10">
      {/* Heading */}
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          BABY GARMENTS
        </h1>
      </div>

      {/* Carousel with Arrows */}
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
                {/* SALE Badge */}
                {product.sale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                    SALE
                  </div>
                )}

                {/* Image */}
                <NavLink to={`/product/${product.id}`} data-aos="fade-left">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                </NavLink>

                {/* Info + Add to Cart */}
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
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 text-white bg-pink-600 hover:bg-pink-700 text-xs py-1 px-3 rounded flex items-center justify-center gap-2"
                  >
                    <FaCartPlus size={14} /> Add to Cart
                  </button>
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

      {/* View All Button */}
      <div className="text-center mt-6">
        <button className="bg-mypurple hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2">
          VIEW ALL <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BabyGarments;
