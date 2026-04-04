import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const newItem = action.payload;

      // check if same product + same addons exists
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.addons) === JSON.stringify(newItem.addons)
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.totalPrice;
      } else {
        state.items.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    increaseQty: (state, action) => {
      const item = state.items[action.payload];
      item.quantity += 1;
      item.totalPrice = item.price * item.quantity;
    },

    decreaseQty: (state, action) => {
      const item = state.items[action.payload];
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
    updateCartItem: (state, action) => {
      const { index, item } = action.payload;
      state.items[index] = item;
    },
  },
});

export const {
  addtoCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;