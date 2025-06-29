import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

// Images
import p1a from "../images/p11.jpg";
import p1b from "../images/p12.jpg";
import p2a from "../images/p21.jpg";
import p2b from "../images/p22.jpg";
import p3a from "../images/p31.jpg";
import p3b from "../images/p32.jpg";
import p4a from "../images/p41.jpg";
import p4b from "../images/p42.jpg";
import p5a from "../images/p51.jpg";
import p5b from "../images/p52.jpg";
import p6a from "../images/p61.jpg";
import p6b from "../images/p62.jpg";
import p7a from "../images/p71.jpg";
import p7b from "../images/p73.jpg";
import p8a from "../images/p81.jpg";
import p8b from "../images/p82.jpg";
import p9a from "../images/p91.jpg";
import p9b from "../images/p92.jpg";
import p10a from "../images/p101.jpg";
import p10b from "../images/p102.jpg";
import p11a from "../images/p111.jpg";
import p11b from "../images/p112.jpg";
import p12a from "../images/p121.jpg";
import p12b from "../images/p122.jpg";
import p13a from "../images/p131.jpg";
import p13b from "../images/p134.jpg";

const productImages = [
  { image: p1a, hoverImage: p1b },
  { image: p2a, hoverImage: p2b },
  { image: p3a, hoverImage: p3b },
  { image: p4a, hoverImage: p4b },
  { image: p5a, hoverImage: p5b },
  { image: p6a, hoverImage: p6b },
  { image: p7a, hoverImage: p7b },
  { image: p8a, hoverImage: p8b },
  { image: p9a, hoverImage: p9b },
  { image: p10a, hoverImage: p10b },
  { image: p11a, hoverImage: p11b },
  { image: p12a, hoverImage: p12b },
  { image: p13a, hoverImage: p13b },
];

const AllProducts = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const dispatch = useDispatch();

  const products = Array.from({ length: 13 }, (_, i) => {
    const img = productImages[i] || productImages[i % productImages.length];
    return {
      id: String(i + 1),
      title: `Baby Outfit ${i + 1}`,
      image: img.image,
      hoverImage: img.hoverImage,
      price: 1200 + i * 50,
      discountPrice: 999 + i * 30,
    };
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-myPink text-center mb-10">
        ALL BABY GARMENTS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden group relative transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Image with Hover Effect */}
            <NavLink to={`/product/${product.id}`} className="block relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain bg-productscolor transition-opacity duration-300 group-hover:opacity-0"
                data-aos="fade-down"
              />
              <img
                src={product.hoverImage}
                alt={`${product.title} Hover`}
                className="w-full h-48 object-contain bg-productscolor absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </NavLink>

            {/* Product Info */}
            <div className="p-3 text-center">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                {product.title}
              </h4>
              <div className="flex justify-center gap-2 text-sm mb-2">
                <p className="line-through text-gray-400">
                  Rs.{product.price.toLocaleString()}
                </p>
                <p className="text-pink-600 font-semibold">
                  Rs.{product.discountPrice.toLocaleString()}
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
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
