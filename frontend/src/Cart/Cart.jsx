import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/CartSlice';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';



const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold mb-5 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Your Cart</h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
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
    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
    <p className="text-xs text-pink-600 font-semibold">
      Rs. {item.discountPrice.toLocaleString()}
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

      <div className="p-4 border-t">
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full text-sm bg-mypurple hover:bg-myPink text-white py-2 rounded "
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
