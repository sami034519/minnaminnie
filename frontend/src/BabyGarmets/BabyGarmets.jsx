import React, { useEffect, useState } from "react";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { garments } from "../data/Product"; // updated

const BabyGarments = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Responsive slide count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleAddToCart = (product) => {
  const numericPrice =
    typeof product.price === "string"
      ? parseInt(product.price.replace(/Rs\.?\s?/, "").replace(/,/g, ""))
      : product.price;

  dispatch(
    addToCart({
      ...product,
      price: numericPrice,
      quantity: 1,
      type: "garments", // <-- set product type explicitly here
    })
  );
};


  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? garments.length - visibleCount : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % garments.length);
  };

  const visibleProducts = [...garments, ...garments].slice(
    index,
    index + visibleCount
  );

  return (
    <div className="w-full py-8 my-10">
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold text-myPink">
          BABY GARMENTS
        </h1>
      </div>

      {/* Carousel controls + items */}
      <div className="flex items-center justify-center gap-2">
        {/* Prev button */}
        <button
          onClick={prevSlide}
          className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
        >
          <FaChevronLeft />
        </button>

        {/* Products */}
        <div className="flex gap-4 overflow-hidden">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-md shadow w-[260px] flex flex-col transition-transform duration-500 overflow-hidden group"
            >
              {/* SALE badge */}
              {product.sale && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                  SALE
                </div>
              )}

              {/* Image with hover and NavLink */}
              <NavLink
                to={`/product/${product.id}`}
                className="relative bg-productscolor"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain relative z-10 transition-opacity duration-300"
                  data-aos='fade-left'
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={`${product.title} Hover`}
                    className="absolute top-0 left-0 w-full h-48 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
                  />
                )}
              </NavLink>

              {/* Info */}
              <div className="p-2 text-xs text-center">
                <h3 className="font-medium text-gray-800">{product.title}</h3>
                <div className="flex justify-center items-center gap-2 mt-1 text-sm">
                  <p className="text-gray-400 line-through">
                    Rs.{(product.price + 200).toLocaleString()}
                  </p>
                  <p className="text-pink-600 font-semibold">
                    Rs.{product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 text-white bg-myPink hover:bg-mypurple text-xs py-1 px-3 rounded flex items-center justify-center gap-2"
                >
                  <FaCartPlus size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="bg-pink-600 text-white p-1 rounded-full shadow hover:bg-pink-700"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* View All Link */}
      <div className="text-center mt-6">
        <NavLink
          to="/allgarments"
          className="bg-mypurple lg:w-[30%] w-[80%] hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex justify-center items-center gap-2"
          data-aos="fade-right"
        >
          VIEW ALL <FaChevronRight size={14} />
        </NavLink>
      </div>
    </div>
  );
};

export default BabyGarments;
