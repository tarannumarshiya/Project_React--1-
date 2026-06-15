import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: [],

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    decrementQuantity: (state, action) => {
      const existingItem = state.find(
        (item) => item.id === action.payload
      );

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        return state.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    removeFromCart: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;