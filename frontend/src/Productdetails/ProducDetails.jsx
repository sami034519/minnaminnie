import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/Product";
import { BsTruck, BsGift } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id); // ensure string match

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product?.image);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsPopupOpen(true);
  };

  const handleSubmitOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    const orderData = {
      ...form,
      message: `Order for ${product.title} | Size: ${selectedSize} | Qty: ${quantity} | Price: ${product.discountPrice}`,
      product: {
        title: product.title,
        price: product.discountPrice,
        sizes: product.sizes,
        features: product.features,
        image: product.image,
      },
    };

    try {
      const res = await fetch("https://minna-m-innie-backend.vercel.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

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

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-mypurple text-white text-xs text-center py-2 mb-6">
        FREE SHIPPING only for prepaid orders will automatically apply on PayFast at checkout
      </div>

      <div className="text-xs text-gray-500 mb-6">Home / {product.title}</div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="bg-productscolor p-4 rounded">
            <img src={mainImage} alt={product.title} className="w-full h-[500px] object-contain" />
          </div>
          <div className="flex gap-2 mt-4">
            {[product.image, product.hoverImage].map((img, i) => (
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

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-pink-600 font-semibold mb-4"> {product.discountPrice}</p>

          <p className="text-xs mb-1">
            <span className="font-medium">NOTE:</span> Please check the <span className="text-red-500 underline">Size Chart</span> in the last image.
          </p>
          <p className="text-xs mb-3">
            <span className="font-medium">SIZE CHART NOTE:</span> Allow 0.5 inch +/- tolerance.
          </p>

          <div className="flex items-center gap-2 text-sm mb-2">
            <BsTruck className="text-pink-600" /> Delivery in 3 - 5 working days.
          </div>
          <div className="flex items-center gap-2 text-sm mb-4">
            <BsGift className="text-pink-600" /> Gift wrapping available at cart page.
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium mb-1">SIZE</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded text-sm ${
                    selectedSize === size
                      ? "bg-myPink text-white border-myPink"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium mb-1">QUANTITY</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 py-1 border rounded text-sm">-</button>
              <span className="text-sm">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-2 py-1 border rounded text-sm">+</button>
            </div>
          </div>

          <p className="text-sm text-green-600 mb-4">🟢 In stock, ready to ship</p>

          <button
            onClick={handleOrderNow}
            className="w-full py-3 bg-mypurple hover:bg-myPink text-white text-sm font-medium rounded flex items-center justify-center gap-2"
          >
            <FaShoppingBag size={16} /> Order Now
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-md font-medium text-gray-800 mb-3">Product Features</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {product.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
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
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleFormChange}
                rows="2"
                className="w-full border p-2 rounded text-sm"
              />

              <div className="text-sm mt-2">
                <p><strong>Product:</strong> {product.title}</p>
                <p><strong>Size:</strong> {selectedSize}</p>
                <p><strong>Qty:</strong> {quantity}</p>
                <p><strong>Total Price:</strong> Rs. {product.discountPrice * quantity}</p>
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

export default ProductDetail;
