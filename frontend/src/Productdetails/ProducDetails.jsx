import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/Product";
import { BsTruck, BsGift } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product?.image);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!product) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Product not found.
      </div>
    );
  }

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setShowPopup(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      ...formData,
      message: `Order for ${product.title} | Size: ${selectedSize} | Qty: ${quantity} | Price: ${product.price}`,
      product: {
        title: product.title,
        price: product.price,
        sizes: product.sizes,
        features: product.features,
        image: product.image,
      },
    };

    try {
      const res = await fetch("https://minna-m-innie-backend.vercel.app/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        setShowPopup(false);
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      <div className="bg-mypurple text-white text-xs text-center py-2 mb-6">
        FREE SHIPPING only for prepaid orders will automatically apply on PayFast at checkout
      </div>

      <div className="text-xs text-gray-500 mb-6">Home / {product.title}</div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="bg-productscolor p-4 rounded">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[product.image, product.hoverImage].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 bg-productscolor object-contain border rounded cursor-pointer ${
                  mainImage === img ? "border-myPink" : "border-productscolor"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-xl text-pink-600 font-semibold mb-4">Rs. {product.price}</p>

          <p className="text-xs text-gray-600 mb-1">
            <span className="font-medium">NOTE:</span> Please check the{" "}
            <span className="text-red-500 underline">Size Chart</span> in the last image.
          </p>
          <p className="text-xs text-gray-600 mb-3">
            <span className="font-medium">SIZE CHART NOTE:</span> Allow 0.5 inch +/- tolerance.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <BsTruck className="text-pink-600" />
            Delivery time is 3 - 5 working days after order confirmation.
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            <BsGift className="text-pink-600" />
            Gift wrapping available at cart page.
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

          <p className="text-sm text-green-600 mb-4">🟢 In stock, ready to ship</p>

          <button
            onClick={handleOrderNow}
            className="w-full py-3 bg-mypurple hover:bg-myPink text-white text-sm font-medium rounded flex items-center justify-center gap-2"
          >
            <FaShoppingBag size={16} />
            ORDER NOW
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-md font-medium text-gray-800 mb-3">Product Features</h3>
        <ul className="text-sm text-gray-600 list-disc list-inside">
          {product.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Order Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Complete Your Order</h2>

            <form onSubmit={handleSubmitOrder} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full border px-3 py-2 rounded text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full border px-3 py-2 rounded text-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <textarea
                required
                placeholder="Delivery Address"
                className="w-full border px-3 py-2 rounded text-sm"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />

              {/* Pre-filled summary (read-only) */}
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
                <p><strong>Product:</strong> {product.title}</p>
                <p><strong>Size:</strong> {selectedSize}</p>
                <p><strong>Qty:</strong> {quantity}</p>
                <p><strong>Total Price:</strong> Rs. {product.price * quantity}</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-myPink text-white rounded text-sm mt-3 hover:bg-pink-700"
              >
                {isLoading ? "Placing Order..." : "Confirm Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
