import React, { useState } from 'react';

const categoryOptions = [
  "Girls' Apparel",
  "Boys' Apparel",
  "Sportswear",
  "Toys",
  "Shoes",
  "Watches"
];

const UpdateProductPopup = ({ onClose }) => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({});

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchProducts = async () => {
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

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdateData({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discount_price: product.discount_price,
      stock: product.stock,
    });
  };

  const handleInputChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (let key in updateData) {
        formData.append(key, updateData[key]);
      }

      const response = await fetch('https://minnaminnie.com/minnaminniebackend/update_product.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Product updated successfully.');
        setSelectedProduct(null);
        fetchProducts(); // Refresh products
      } else {
        alert('Update failed: ' + result.message);
      }
    } catch (err) {
      alert('Update request failed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-auto pt-10">
      <div className="bg-white text-black p-6 rounded-md w-[90%] max-w-4xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Products</h2>
          <button className="text-red-500" onClick={onClose}>✕</button>
        </div>

        {/* Category Selector */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Category:</label>
          <select value={category} onChange={handleCategoryChange} className="w-full border p-2 rounded">
            <option value="">-- Choose --</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={fetchProducts} className="mt-2 bg-mypurple text-white px-4 py-2 rounded">Fetch Products</button>
        </div>

        {/* Product List */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-3 rounded bg-productscolor relative">
                <img src={product.image} alt={product.title} className="w-full h-32 object-contain rounded" />
                <h3 className="font-bold mt-2">{product.title}</h3>
                <p className="text-sm">Stock: {product.stock}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-mypurple text-white w-full p-2 hover:bg-myPink text-sm"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Form */}
        {selectedProduct && (
          <div className="mt-6 bg-gray-200 p-4 rounded">
            <h3 className="font-bold mb-2">Edit Product</h3>

            <input
              type="text"
              name="title"
              value={updateData.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={updateData.description}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Description"
            />
            <input
              type="number"
              name="price"
              value={updateData.price}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Price"
            />
            <input
              type="number"
              name="discount_price"
              value={updateData.discount_price}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Discount Price"
            />
            <input
              type="number"
              name="stock"
              value={updateData.stock}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Stock"
            />

            <div className="flex justify-between">
              <button onClick={handleUpdate} className="bg-mypurple text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button onClick={() => setSelectedProduct(null)} className="text-red-500">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProductPopup;
