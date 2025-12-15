import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import winter1 from '../images/winter1.jpeg'
import winter2 from '../images/winter2.jpeg'
import winter3 from '../images/winter3.jpeg'
import winter4 from '../images/winter4.jpeg'
import winter5 from '../images/winter5.jpeg'
import winter6 from '../images/winter6.jpeg'
import winter7 from '../images/winter7.jpeg'
import winter8 from '../images/winter8.jpeg'

/* =======================
   LOCAL PRODUCTS ARRAY
======================= */
const products = [
  {
    id: "318",
    title: "Baby Blue Shirt",
    description:
      "💙 Color: Blue Check\r\n\r\n👧 For: Infant & Toddler Girls\r\n\r\n🌿 Material: 100% Soft Cotton\r\n\r\n📏 Fit: Relaxed & Comfortable\r\n\r\n🌞 Ideal for: Everyday wear, casual events, summer outings\r\n\r\n🧼 Care: Machine washable",
    price: "2000",
    discount_price: "1500",
    stock: "10",
    image: winter1,
  },
  {
    id: "319",
    title: "Pink Floral Frock",
    price: "2300",
    discount_price: "1800",
    stock: "12",
    image: winter2,
  },
  {
    id: "320",
    title: "Yellow Summer Top",
    price: "1800",
    discount_price: "1350",
    stock: "15",
    image: winter3,
  },
  {
    id: "321",
    title: "Denim Baby Shirt",
    price: "2500",
    discount_price: "1950",
    stock: "8",
    image: winter4,
  },
  {
    id: "322",
    title: "White Cotton Kurti",
    price: "2600",
    discount_price: "2100",
    stock: "6",
    image: winter5,
  },
  {
    id: "323",
    title: "Green Casual Shirt",
    price: "1900",
    discount_price: "1450",
    stock: "14",
    image: winter6,
  },
  {
    id: "324",
    title: "Peach Party Dress",
    price: "3200",
    discount_price: "2700",
    stock: "5",
    image: winter7,
  },
  {
    id: "325",
    title: "Printed Cotton Top",
    price: "1700",
    discount_price: "1300",
    stock: "18",
    image:winter8,
  },
  
];

const WinterProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const parsePrice = (price) => parseInt(price, 10);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        price: parsePrice(product.discount_price || product.price),
        quantity: 1,
        type: "garment",
      })
    );
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-myPink text-center mb-10">
        ALL BABY GARMENTS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const originalPrice = parsePrice(product.price);
          const discountedPrice = parsePrice(product.discount_price);
          const fakeOldPrice = originalPrice + 200;

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
            >
              <NavLink to={`/product/${product.id}`}>
                <div className="w-full h-48 bg-productscolor">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                    data-aos="fade-down"
                  />
                </div>
              </NavLink>

              <div className="p-3 text-center">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  {product.title}
                </h4>

                <div className="flex justify-center gap-2 text-sm mb-2">
                  <p className="line-through text-gray-400">
                    Rs. {fakeOldPrice.toLocaleString()}
                  </p>
                  <p className="text-pink-600 font-semibold">
                    Rs. {discountedPrice.toLocaleString()}
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

export default WinterProducts;
