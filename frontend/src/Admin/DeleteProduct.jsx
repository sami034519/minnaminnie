import React, { useState } from 'react';

const categoryOptions = [
  "Girls' Apparel",
  "Boys' Apparel",
  "Sportswear",
  "Toys",
  "Shoes",
];

const DeleteProductPopup = ({ onClose }) => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchProducts = async () => {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    try {
      const res = await fetch(`https://minnaminnie.com/minnaminniebackend/get_products_by_category.php?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      } else {
        alert('No products found.');
      }
    } catch (err) {
      alert('Failed to fetch products.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const formData = new FormData();
      formData.append('id', id);

      const response = await fetch('https://minnaminnie.com/minnaminniebackend/delete_product.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Product deleted successfully.');
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Delete failed: ' + result.message);
      }
    } catch (err) {
      alert('Delete request failed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-auto pt-10">
      <div className="bg-white text-black p-6 rounded-md w-[90%] max-w-4xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Delete Products</h2>
          <button className="text-red-500 text-2xl" onClick={onClose}>✕</button>
        </div>

        {/* Category Selector */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choose --</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={fetchProducts}
            className="mt-2 bg-mypurple text-white px-4 py-2 rounded hover:bg-myPink"
          >
            Fetch Products
          </button>
        </div>

        {/* Product List */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-3 rounded bg-gray-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain rounded"
                />
                <h3 className="font-bold mt-2 text-sm">{product.title}</h3>
                <p className="text-xs">Stock: {product.stock}</p>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteProductPopup;
