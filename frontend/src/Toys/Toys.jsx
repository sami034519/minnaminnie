import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const videoPath = "/videos/Toysvideo.mp4"; // Relative path from public

const ToysSection = () => {
  const dispatch = useDispatch();
  const [toys, setToys] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const baseUrl = "https://myapi.minnaminnie.com/";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchToys = async () => {
      try {
        const res = await fetch(
          `${baseUrl}get_products_by_category.php?category=Toys`
        );
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.products)) {
          setToys(data.products);
        } else {
          console.error("Failed to fetch toys:", data.message);
        }
      } catch (err) {
        console.error("Error fetching toys:", err);
      }
    };

    fetchToys();
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
    const numericPrice =
      typeof toy.discount_price === "string"
        ? parseInt(toy.discount_price.replace(/Rs\.?\s?/, "").replace(/,/g, ""))
        : toy.discount_price || toy.price;

    dispatch(
      addToCart({
        ...toy,
        price: numericPrice,
        quantity: 1,
        type: "toy",
      })
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-auto lg:h-[60vh] overflow-hidden animate__animated animate__zoomIn">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <video
          className="w-full h-full object-contain lg:object-cover"
          src={videoPath}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute bottom-10 w-full z-20 flex items-center justify-center text-white text-center px-4">
          <NavLink to="/toys">
            <button className="border-[3px] px-3 py-1 mt-3 border-white hover:bg-white hover:text-black transition-all">
              SHOP NOW
            </button>
          </NavLink>
        </div>
      </div>

      {/* Toys Carousel Section */}
      <div className="w-full my-10 py-8">
        <div className="flex justify-center space-x-4 mb-6" data-aos="fade-down">
          <h2 className="text-3xl mb-5 font-extrabold text-myPink">
            TOYS COLLECTION
          </h2>
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
                  className={`relative bg-white rounded-md shadow h-[330px] w-[260px] flex flex-col transition-transform duration-500 overflow-hidden group ${
                    isActive ? "scale-100 z-10" : "scale-100"
                  }`}
                >
                  {toy.discount_price && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                      SALE
                    </div>
                  )}

                  <NavLink to={`/product/${toy.id}`} data-aos="fade-left" className="relative">
                    <img
                      src={toy.image}
                      alt={toy.title}
                      className="bg-slate-100 w-full h-48 object-contain rounded-t-md z-10 relative"
                    />
                    {toy.hover_image && (
                      <img
                        src={
                          toy.hover_image.startsWith("http")
                            ? toy.hover_image
                            : baseUrl + toy.hover_image
                        }
                        alt={`${toy.title} Hover`}
                        className="absolute top-0 left-0 w-full h-48 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
                      />
                    )}
                  </NavLink>

                  <div className="p-2 text-xs text-center">
                    <h3 className="font-medium text-gray-800">{toy.title}</h3>
                    <div className="flex justify-center items-center gap-2 mt-1">
                      <p className="text-gray-400 line-through text-sm">
                        Rs.{parseInt(toy.price).toLocaleString()}
                      </p>
                      <p className="text-pink-600 font-semibold text-sm">
                        Rs.{parseInt(toy.discount_price || toy.price).toLocaleString()}
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

        {/* View All Button */}
        <div className="text-center mt-6">
          <NavLink to="/toys">
            <button
              className="bg-mypurple lg:w-[30%] w-[80%] justify-center hover:bg-myPink text-white px-6 py-2 text-sm font-semibold rounded inline-flex items-center gap-2"
              data-aos="fade-right"
            >
              VIEW ALL <FaChevronRight size={14} />
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ToysSection;
