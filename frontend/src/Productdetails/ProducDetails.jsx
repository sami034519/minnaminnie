import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsTruck, BsGift } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://minnaminnie.com/minnaminniebackend/get_product_by_id.php?id=${id}`);
        const json = await res.json();

        if (json.status === "success") {
          const p = json.product;
          p.features = p.description.split(/\r?\n/).filter(l => l.trim());
          p.sizes = p.sizes || ["S", "M", "L", "XL"];

          const imageList = [p.image];
          if (p.hover_image) imageList.push(p.hover_image);

          setProduct(p);
          setMainImage(p.image);
          setImages(imageList);
        } else {
          setProduct(null);
        }
      } catch (e) {
        console.error(e);
        setProduct(null);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    if (!form.name || !form.email || !form.phone || !form.adress) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    const numericPrice = parseInt(product.discount_price || product.price) || 0;

    const orderData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      adress: form.adress,
      message: `Order for ${product.title} - Size: ${selectedSize} - Qty: ${quantity}`,
      product: {
        title: product.title,
        price: `PKR ${numericPrice.toLocaleString()}`,
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

  if (loadingProduct) return <div className="text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-center text-red-500 mt-10">Product not found.</div>;

  const numericPrice = parseInt(product.discount_price || product.price) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-mypurple text-white text-xs text-center py-2 mb-6">
        FREE SHIPPING only for prepaid orders will automatically apply on PayFast at checkout
      </div>

      <div className="text-xs text-gray-500 mb-6">Home / {product.title}</div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image Section */}
       {/* Product Image Section */}
<div>
  <div className="bg-productscolor p-4 rounded">
    <img
      src={mainImage}
      alt={product.title}
      className="w-full h-[500px] object-contain"
    />
  </div>

  <div className="flex gap-2 mt-4">
    {/* Render the alternate image as a thumbnail */}
    {mainImage !== product.image && (
      <img
        src={product.image}
        alt="Main"
        onClick={() => setMainImage(product.image)}
        className="w-20 h-20 object-contain bg-productscolor border rounded cursor-pointer border-productscolor hover:border-myPink"
      />
    )}
    {mainImage !== product.hover_image && product.hover_image && (
      <img
        src={product.hover_image}
        alt="Hover"
        onClick={() => setMainImage(product.hover_image)}
        className="w-20 h-20 object-contain bg-productscolor border rounded cursor-pointer border-productscolor hover:border-myPink"
      />
    )}
  </div>
</div>


        {/* Product Info Section */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-pink-600 font-semibold mb-4">
            Rs. {numericPrice.toLocaleString()}
          </p>

          <p className="text-xs mb-1">
            <span className="font-medium">NOTE:</span> Please check the{" "}
            <span
              className="text-red-500 underline cursor-pointer"
              onClick={() => setIsSizeChartOpen(true)}
            >
              Size Chart
            </span>{" "}
            in the last image.
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

          {/* Size Buttons */}
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
          {product.features?.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded relative max-w-xl w-full">
            <button
              className="absolute top-2 right-3 bg-red-500 px-2 rounded-full text-white text-3xl"
              onClick={() => setIsSizeChartOpen(false)}
            >
              &times;
            </button>
            <img src="/images/sizechart.jpg" alt="Size Chart" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}

      {/* Order Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-3 text-gray-600 text-lg" onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>

            <div className="space-y-3">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleFormChange} className="w-full border p-2 rounded text-sm" />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleFormChange} className="w-full border p-2 rounded text-sm" />
              <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleFormChange} className="w-full border p-2 rounded text-sm" />
              <textarea name="adress" placeholder="Delivery Address" value={form.adress} onChange={handleFormChange} rows="2" className="w-full border p-2 rounded text-sm" />

              <div className="text-sm mt-2">
                <p><strong>Product:</strong> {product.title}</p>
                <p><strong>Size:</strong> {selectedSize}</p>
                <p><strong>Qty:</strong> {quantity}</p>
                <p><strong>Total Price:</strong> Rs. {(numericPrice * quantity).toLocaleString()}</p>
              </div>

              <button onClick={handleSubmitOrder} disabled={isLoading} className="w-full bg-mypurple hover:bg-myPink text-white py-2 rounded text-sm font-medium">
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
