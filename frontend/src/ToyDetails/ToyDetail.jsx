import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toys } from "../data/Product"; // Assuming you export toys from this file
import { BsTruck, BsGift } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const ToyDetail = () => {
  const { id } = useParams();
  const toy = toys.find((t) => String(t.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(toy?.image);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderNow = () => {
    setIsPopupOpen(true);
  };

  const handleSubmitOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.adress) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

   const orderData = {
  name: form.name,
  email: form.email,
  phone: form.phone,
  adress: form.adress,
  message: `Order for ${toy.title} - Qty: ${quantity}`,
  product: {
    title: toy.title,
    price: `PKR ${(toy.discountPrice * quantity).toLocaleString()}`,
    sizes: ["Not applicable"],
    features: ["Fun and engaging toy for kids", "Safe and durable material"],
    image: toy.image,
  },
};


    try {
      const res = await fetch(
        "https://minna-m-innie-backend.vercel.app/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Your order has been placed successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to send order: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!toy) {
    return <div className="text-center text-red-500 mt-10">Toy not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-mypurple text-white text-xs text-center py-2 mb-6">
        FREE SHIPPING only for prepaid orders will automatically apply on PayFast at checkout
      </div>

      <div className="text-xs text-gray-500 mb-6">Home / {toy.title}</div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Toy Image */}
        <div>
          <div className="bg-productscolor p-4 rounded">
            <img
              src={mainImage}
              alt={toy.title}
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[toy.image].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-contain bg-productscolor border rounded cursor-pointer ${
                  mainImage === img ? "border-myPink" : "border-productscolor"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Toy Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{toy.title}</h1>
          <div className="text-xl font-semibold mb-4">
            {toy.sale && (
              <span className="text-gray-400 line-through mr-2">
                Rs. {toy.price.toLocaleString()}
              </span>
            )}
            <span className="text-pink-600">
              Rs. {toy.discountPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-2">
            <BsTruck className="text-pink-600" /> Delivery in 3 - 5 working days.
          </div>
          <div className="flex items-center gap-2 text-sm mb-4">
            <BsGift className="text-pink-600" /> Gift wrapping available at cart page.
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">QUANTITY</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2 py-1 border rounded text-sm"
              >
                -
              </button>
              <span className="text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2 py-1 border rounded text-sm"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm text-green-600 mb-4">
            🟢 In stock, ready to ship
          </p>

          <button
            onClick={handleOrderNow}
            className="w-full py-3 bg-mypurple hover:bg-myPink text-white text-sm font-medium rounded flex items-center justify-center gap-2"
          >
            <FaShoppingBag size={16} /> Order Now
          </button>
        </div>
      </div>

      {/* Order Form Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-lg"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full border p-2 rounded text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full border p-2 rounded text-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full border p-2 rounded text-sm"
              />
              <textarea
                name="adress"
                placeholder="Delivery Address"
                value={form.adress}
                onChange={handleFormChange}
                rows="2"
                className="w-full border p-2 rounded text-sm"
              />

              <div className="text-sm mt-2">
                <p>
                  <strong>Product:</strong> {toy.title}
                </p>
                <p>
                  <strong>Qty:</strong> {quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> Rs.{" "}
                  {(toy.discountPrice * quantity).toLocaleString()}
                </p>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={isLoading}
                className="w-full bg-mypurple hover:bg-myPink text-white py-2 rounded text-sm font-medium"
              >
                {isLoading ? "Placing Order..." : "Submit Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToyDetail;
