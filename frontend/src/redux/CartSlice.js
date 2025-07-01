import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const incoming = action.payload;

      // Match by both id and type to avoid conflicts between similar ids
      const existing = state.cartItems.find(
        item => item.id === incoming.id && item.type === incoming.type
      );

      if (existing) {
        existing.quantity += incoming.quantity || 1;
      } else {
        state.cartItems.push({
          ...incoming,
          quantity: incoming.quantity || 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      // Remove item by id AND type for accuracy
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload.id || item.type !== action.payload.type
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    updateQuantity: (state, action) => {
      const { id, type, quantity } = action.payload;
      const item = state.cartItems.find(
        item => item.id === id && item.type === type
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
