import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const AllSportswear = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchSportswear = async () => {
      try {
        const res = await fetch(
          "https://myapi.minnaminnie.com/get_products_by_category.php?category=Sportswear"
        );
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch sportswear:", data.message);
        }
      } catch (err) {
        console.error("Error fetching sportswear:", err);
      }
    };

    fetchSportswear();
  }, []);

  const parsePrice = (priceString) => {
    if (typeof priceString === "string") {
      return parseInt(priceString.replace(/Rs\.?\s?/, "").replace(/,/g, ""));
    }
    return priceString;
  };

  const handleAddToCart = (product) => {
    const numericPrice = parsePrice(product.discount_price || product.price);
    dispatch(
      addToCart({
        ...product,
        price: numericPrice,
        quantity: 1,
        type: "sportswear",
      })
    );
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-myPink text-center mb-10">
        ALL SPORTSWEAR
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const originalPrice = parsePrice(product.discount_price || product.price);
          const fakeOldPrice = parsePrice(product.price);

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden group relative transition-transform duration-300 hover:scale-[1.02]"
            >
              {product.discount_price && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
                  SALE
                </div>
              )}

              <NavLink to={`/product/${product.id}`} className="block relative">
                <div className="relative w-full h-48 bg-productscolor">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain z-10 relative transition-opacity duration-300"
                    data-aos="fade-down"
                  />
                </div>
              </NavLink>

              <div className="p-3 text-center">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  {product.title}
                </h4>

                <div className="flex justify-center gap-2 text-sm mb-2">
                  {product.discount_price && (
                    <p className="line-through text-gray-400">
                      Rs. {fakeOldPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-pink-600 font-semibold">
                    Rs. {originalPrice.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  <NavLink
                    to={`/product/${product.id}`}
                    className="bg-mypurple hover:bg-myPink text-white px-3 py-1 rounded text-xs"
                  >
                    View Details
                  </NavLink>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-myPink hover:bg-mypurple text-white px-3 py-1 rounded text-xs flex items-center gap-2 justify-center"
                  >
                    <FaCartPlus size={12} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSportswear;
