import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Load cart items from localStorage on app start
const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart items to localStorage on every update
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart.cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Middleware for logging actions (optional for dev)
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};

// Create store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      cartItems: loadCartFromLocalStorage(),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes to persist cart
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

export default store;
