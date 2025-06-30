import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/CartSlice';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Your Cart
        </h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 mb-4 border-b pb-3"
            >
              <NavLink to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded"
                />
              </NavLink>

              <div className="flex-1">
                <NavLink to={`/product/${item.id}`}>
                  <h4 className="text-sm font-medium text-gray-800 hover:underline">
                    {item.title}
                  </h4>
                </NavLink>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity || 1}
                </p>
                <p className="text-xs text-pink-600 font-semibold">
                  Rs. {item.price?.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-3 text-sm font-medium">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full text-sm bg-mypurple hover:bg-myPink text-white py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
