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
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderNow = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    setIsLoading(true);

    const orderData = {
      name: "Sami Ullah", // Replace with dynamic form inputs later
      email: "sami@example.com",
      phone: "03001234567",
      adress: "Lahore, Pakistan",
      message: `Order for ${product.title} | Size: ${selectedSize} | Qty: ${quantity} | Price: ${product.price}`,
      product: {
        title: product.title,
        price: product.price,
        sizes: product.sizes,
        features: product.features,
        image: product.image,
      }
    };

    try {
      const res = await fetch("https://minna-m-innie-backend.vercel.app/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Your order has been placed successfully!");
      } else {
        alert("Failed to send order: " + data.error);
      }
    } catch (err) {
      console.error("Error sending order:", err);
      alert("Something went wrong while placing your order.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div className="text-center mt-10 text-xl text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Notice */}
      <div className="bg-mypurple text-white text-xs text-center py-2 mb-6">
        FREE SHIPPING only for prepaid orders will automatically apply on PayFast at checkout
      </div>

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6">Home / {product.title}</div>

      {/* Product Section */}
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

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-xl text-pink-600 font-semibold mb-4">{product.price}</p>

          <p className="text-xs text-gray-600 mb-1">
            <span className="font-medium">NOTE:</span> Please check the <span className="text-red-500 underline">Size Chart</span> in the last image.
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

          {/* Sizes */}
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

          {/* Quantity */}
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

          {/* Order Button */}
          <button
            onClick={handleOrderNow}
            disabled={isLoading}
            className="w-full py-3 bg-mypurple hover:bg-myPink text-white text-sm font-medium rounded flex items-center justify-center gap-2"
          >
            <FaShoppingBag size={16} />
            {isLoading ? "ORDERING..." : "ORDER NOW"}
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
    </div>
  );
};

export default ProductDetail;
