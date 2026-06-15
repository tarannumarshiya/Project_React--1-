import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vegItems: [],
  nonVegItems: [],
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      const items = action.payload.map(item => ({
        ...item,
        id: item._id || item.id // Ensure backward compatibility with component id usage
      }));
      state.vegItems = items.filter((item) => item.category === "veg");
      state.nonVegItems = items.filter((item) => item.category === "nonveg");
    },
    addFoodItem: (state, action) => {
      const item = {
        ...action.payload,
        id: action.payload._id || action.payload.id
      };
      if (item.category === "veg") {
        state.vegItems.push(item);
      } else {
        state.nonVegItems.push(item);
      }
    },
    removeFoodItem: (state, action) => {
      const { id, category } = action.payload;
      if (category === "veg") {
        state.vegItems = state.vegItems.filter((item) => (item._id || item.id) !== id);
      } else {
        state.nonVegItems = state.nonVegItems.filter((item) => (item._id || item.id) !== id);
      }
    },
  },
});

export const { setFoodItems, addFoodItem, removeFoodItem } = foodSlice.actions;
export default foodSlice.reducer;
