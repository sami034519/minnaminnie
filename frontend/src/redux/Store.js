import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Optional: Middleware for logging actions (good for development)
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};

// Create store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
