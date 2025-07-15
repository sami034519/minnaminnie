import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const BoysApparel = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const baseUrl = "https://myapi.minnaminnie.com/";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchBoysApparel = async () => {
      try {
        const res = await fetch(
          "https://myapi.minnaminnie.com/get_products_by_category.php?category=Boys%27%20Apparel"
        );
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch boys apparel:", data.message);
        }
      } catch (err) {
        console.error("Error fetching boys apparel:", err);
      }
    };

    fetchBoysApparel();
  }, []);

  const handleAddToCart = (product) => {
    const numericPrice =
      typeof product.discount_price === "string"
        ? parseInt(product.discount_price.replace(/Rs\.?\s?/, "").replace(/,/g, ""))
        : product.discount_price || product.price;

    dispatch(
      addToCart({
        ...product,
        price: numericPrice,
        quantity: 1,
        type: "garment",
      })
    );
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-myPink text-center mb-10">
        BOYS APPAREL
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const actualPrice = parseInt(product.discount_price || product.price);
          const fakeOldPrice = parseInt(product.price) + 200;

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden group relative transition-transform duration-300 hover:scale-[1.02]"
            >
              <NavLink to={`/product/${product.id}`} className="block relative">
                <div className="relative w-full h-48 bg-productscolor">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain z-10 relative transition-opacity duration-300"
                    data-aos="fade-down"
                  />
                  {product.hover_image && (
                    <img
                      src={
                        product.hover_image.startsWith("http")
                          ? product.hover_image
                          : baseUrl + product.hover_image
                      }
                      alt={`${product.title} Hover`}
                      className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
                    />
                  )}
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
                    Rs. {actualPrice.toLocaleString()}
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

export default BoysApparel;
