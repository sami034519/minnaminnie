import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice"; // Adjust the path if needed
import sp1 from "../images/sp1.webp";
import sp2 from "../images/sp2.webp";
import sp3 from "../images/sp3.webp";
import sp4 from "../images/sp4.webp";
import sp5 from "../images/sp5.webp";
import sp6 from "../images/sp6.webp";
import AOS from "aos";

const sportswearProducts = [
  {
    id: 11,
    title: "Boys Athletic Tracksuit - Navy Blue",
    image: sp1,
    price: 2499,
    discountPrice: 1999,
    sale: true,
  },
  {
    id: 12,
    title: "Girls Activewear Set - Peach Pink",
    image: sp2,
    price: 2299,
    discountPrice: 1799,
    sale: true,
  },
  {
    id: 13,
    title: "Unisex Kids Joggers - Grey & Black",
    image: sp3,
    price: 1799,
    discountPrice: 1499,
    sale: false,
  },
  {
    id: 14,
    title: "Boys Sleeveless Sports Tank - Blue",
    image: sp4,
    price: 899,
    discountPrice: 749,
    sale: false,
  },
  {
    id: 15,
    title: "Girls Yoga Set - Purple Haze",
    image: sp5,
    price: 1999,
    discountPrice: 1599,
    sale: true,
  },
  {
    id: 16,
    title: "Kids Sports T-Shirt (3 Pack) - Multicolor",
    image: sp6,
    price: 1299,
    discountPrice: 1099,
    sale: false,
  },
];

const KidsSportswear = () => {
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
      prev === 0 ? sportswearProducts.length - visibleCount : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sportswearProducts.length);
  };

  const visibleProducts = [...sportswearProducts, ...sportswearProducts].slice(
    index,
    index + visibleCount
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full lg:py-12 mb-10 lg:my-10">
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold  text-myPink shadow-md shadow-slate-200 p-1">
          KIDS SPORTSWEAR
        </h1>
      </div>

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
                  isActive ? "scale-100 z-10" : "scale-100"
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
                    className="bg-slate-100 w-60 h-48 object-cover rounded-t-md"
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

      <div className="text-center mt-6">
        <button className="bg-mypurple w-[80%] justify-center hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2" data-aos='fade-right'>
          VIEW ALL <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default KidsSportswear;
