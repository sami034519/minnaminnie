import React, { useEffect, useState } from 'react';
import UpdateProductPopup from './Updateproduct';

const WatchesManager = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    fetch(`https://myapi.minnaminnie.com/get_products_by_category.php?category=Watches`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => {
        alert("Failed to fetch products.");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const formData = new FormData();
      formData.append('id', id);

      const res = await fetch(`https://myapi.minnaminnie.com/delete_product.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.status === 'success') {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Delete failed: ' + data.message);
      }
    } catch (err) {
      alert('Delete request failed');
      console.error(err);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/70 flex justify-center items-start overflow-auto pt-10 px-4">
      <div className="bg-white w-full max-w-5xl rounded-lg p-6 relative text-black">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl bg-mypurple hover:bg-myPink text-white px-3 py-1 rounded"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Watches Products</h2>

        {selectedProduct && (
          <UpdateProductPopup
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdate={fetchProducts}
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded shadow p-3 bg-white">
              <img src={product.image} alt={product.title} className="h-32 w-full object-contain mb-2" />
              <h3 className="font-bold text-sm">{product.title}</h3>
              <p className="text-xs">Stock: {product.stock}</p>
              <div className="flex flex-col mt-2 gap-2">
                <button
                  className="bg-mypurple text-white text-xs px-3 py-1 rounded hover:bg-myPink"
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchesManager;
