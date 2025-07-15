import React, { useState } from "react";

const AddProductPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount_price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Add Product");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleHoverImageChange = (e) => {
    setHoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !hoverImage) {
      setMessage("❌ Please upload both images.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append("image", image);
    data.append("hover_image", hoverImage);

    try {
      setIsSubmitting(true);
      setButtonText("Adding product...");

      const response = await fetch(
        "https://myapi.minnaminnie.com/add_product.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      setMessage(result.message);

      if (result.status === "success") {
        setButtonText("✅ Product Added");
        setFormData({
          title: "",
          description: "",
          price: "",
          discount_price: "",
          stock: "",
          category: "",
        });
        setImage(null);
        setHoverImage(null);

        // Reset button after 2 seconds
        setTimeout(() => {
          setButtonText("Add Product");
        }, 2000);
      } else {
        setButtonText("Add Product");
      }
    } catch (err) {
      console.log(err);
      setMessage("❌ Failed to add product");
      setButtonText("Add Product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed h-screen inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-lg px-2 py-1 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-mypurple">
          Add New Product
        </h2>

        {message && (
          <p className="mb-2 text-sm text-center text-red-500">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="discount_price"
            placeholder="Discount Price"
            value={formData.discount_price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Girls' Apparel">Girls' Apparel</option>
            <option value="Boys' Apparel">Boys' Apparel</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Toys">Toys</option>
            <option value="Shoes">Shoes</option>
            <option value="Watches">Watches</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">
            Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border p-2 rounded"
          />

          <label className="block text-sm font-medium text-gray-700">
            Hover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleHoverImageChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 rounded text-white transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-mypurple hover:bg-myPink"
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
