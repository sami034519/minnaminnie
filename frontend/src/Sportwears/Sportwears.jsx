import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const sportswearProducts = [
  {
    id: 11,
    title: "Boys Athletic Tracksuit Set - Navy",
    image: "/images/sp1-removebg-preview.png",
    price: 2499,
    discountPrice: 1999,
    sale: true,
  },
  {
    id: 12,
    title: "Girls Activewear Outfit Set - Peach",
    image: "/images/sp2-removebg-preview.png",
    price: 2299,
    discountPrice: 1799,
    sale: true,
  },
  {
    id: 13,
    title: "Unisex Kids Joggers Set - Grey",
    image: "/images/sp3-removebg-preview.png",
    price: 1799,
    discountPrice: 1499,
    sale: false,
  },
  {
    id: 14,
    title: "Boys Sleeveless Tank Top - Blue",
    image: "/images/sp4-removebg-preview.png",
    price: 899,
    discountPrice: 749,
    sale: false,
  },
  {
    id: 15,
    title: "Girls Yoga Outfit Set - Purple",
    image: "/images/sp5-removebg-preview.png",
    price: 1999,
    discountPrice: 1599,
    sale: true,
  },
  {
    id: 16,
    title: "Kids Sports T-Shirt Pack - Multicolor",
    image: "/images/sp6-removebg-preview.png",
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

    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 4 : 2);
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
    dispatch(addToCart({ ...product, quantity: 1, price: product.discountPrice }));
  };

  return (
    <div className="w-full lg:py-12 mb-10 lg:my-10">
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold text-myPink">
          KIDS SPORTSWEAR
        </h1>
      </div>

      {/* Carousel Section */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={prevSlide}
          className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
        >
          <FaChevronLeft />
        </button>

        <div className="flex gap-4 overflow-hidden">
          {visibleProducts.map((product, idx) => (
            <div
              key={product.id}
              className="relative bg-white rounded-md shadow w-[260px] flex flex-col transition-transform duration-500"
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
                  className="bg-slate-100 w-60 h-48 object-contain rounded-t-md"
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
          ))}
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
        <NavLink to="/sport-wears">
          <button
            className="bg-mypurple lg:w-[30%] w-[80%] justify-center hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2"
            data-aos="fade-right"
          >
            VIEW ALL <FaChevronRight size={14} />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default KidsSportswear;
