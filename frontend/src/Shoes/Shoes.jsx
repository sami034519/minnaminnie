import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const shoeProducts = [
  {
    id: 31,
    title: "Boys Sneakers Casual - Navy Blue",
    image: "/images/shoe1-removebg-preview.png",
    price: 2599,
    discountPrice: 2099,
    sale: true,
  },
  {
    id: 32,
    title: "Girls Glitter Pumps - Pink Shine",
    image: "/images/shoe2-removebg-preview.png",
    price: 2399,
    discountPrice: 1899,
    sale: true,
  },
  {
    id: 33,
    title: "Unisex Slip-on Shoes - Grey Sport",
    image: "/images/shoe3-removebg-preview.png",
    price: 1999,
    discountPrice: 1599,
    sale: false,
  },
  {
    id: 34,
    title: "Kids Velcro Sandals - Black Edition",
    image: "/images/shoe4-removebg-preview.png",
    price: 1399,
    discountPrice: 1199,
    sale: false,
  },
  {
    id: 35,
    title: "Girls Ballerina Flats - Purple Charm",
    image: "/images/shoe5-removebg-preview.png",
    price: 2199,
    discountPrice: 1799,
    sale: true,
  },
  {
    id: 36,
    title: "Kids Canvas Shoes - Multicolor Pack",
    image: "/images/shoe6-removebg-preview.png",
    price: 1899,
    discountPrice: 1499,
    sale: false,
  },
];

const KidsShoes = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 4 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1, price: product.discountPrice }));
  };

  return (
    <div className="w-full lg:py-12 mt-10 mb-10 lg:my-10">
      <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
        <h1 className="text-3xl mb-5 font-extrabold text-myPink">KIDS SHOES</h1>
      </div>

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
              className={`relative bg-white rounded-md shadow w-[260px] flex flex-col transition-transform duration-500`}
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
                  className="bg-slate-100 rounded w-60 h-48 object-contain rounded-t-md"
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
                  className="bg-pink-600 text-white text-xs mt-2 px-3 py-1 rounded hover:bg-pink-700 transition flex items-center gap-2 justify-center"
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

      <div className="text-center mt-6">
        <NavLink to="/shoes">
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

export default KidsShoes;
