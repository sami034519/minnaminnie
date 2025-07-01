import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { sportswear } from "../data/Product"; // ✅ Imported sportswear array

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
      prev === 0 ? sportswear.length - visibleCount : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sportswear.length);
  };

  const visibleProducts = [...sportswear, ...sportswear].slice(
    index,
    index + visibleCount
  );

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
        price: item.discountPrice,
        type: "sportswear", // Required for order logic
      })
    );
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
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-md shadow w-[260px] flex flex-col transition-transform duration-500"
            >
              {product.sale && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                  SALE
                </div>
              )}

              <NavLink to={`/sportswear/${product.id}`} data-aos="fade-left">
                <img
                  src={product.image}
                  alt={product.title}
                  className="bg-slate-100 w-60 h-48 object-contain rounded-t-md"
                />
              </NavLink>

              <div className="p-2 text-xs text-center">
                <h3 className="font-medium text-gray-800">{product.title}</h3>
                <div className="flex justify-center items-center gap-2 mt-1">
                  {product.sale && (
                    <p className="text-gray-400 line-through text-sm">
                      Rs.{product.price.toLocaleString()}
                    </p>
                  )}
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
        <NavLink to="/sportwears">
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
