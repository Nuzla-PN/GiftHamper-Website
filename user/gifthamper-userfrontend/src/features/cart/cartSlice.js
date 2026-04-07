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

        const addonsArray = Array.isArray(newItem.addons)
          ? newItem.addons
          : newItem.addons && typeof newItem.addons === "object"
            ? Object.values(newItem.addons).filter(Boolean)
            : [];

        const addonTotal = addonsArray.reduce(
          (sum, ad) => sum + (ad?.price ?? 0),
          0
        );

        const existingItem = state.items.find(
          (item) =>
            item.id === newItem.id &&
            JSON.stringify(item.addons) === JSON.stringify(newItem.addons)
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;

          // ✅ FIXED calculation
          existingItem.totalPrice =
            (existingItem.price + addonTotal) * existingItem.quantity;

        } else {
          // ✅ ensure correct totalPrice when adding new
          newItem.totalPrice =
            (newItem.price + addonTotal) * newItem.quantity;

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
      const addonsArray = Array.isArray(item.addons)
    ? item.addons
    : item.addons && typeof item.addons === "object"
      ? Object.values(item.addons).filter(Boolean)
      : [];

      const addonTotal = addonsArray.reduce(
        (sum, ad) => sum + (ad?.price ?? 0),
        0
      );

      item.totalPrice = (item.price + addonTotal) * item.quantity;
    },

    decreaseQty: (state, action) => {
      const item = state.items[action.payload];
      if (item.quantity > 1) {
        item.quantity -= 1;
       const addonsArray = Array.isArray(item.addons)
      ? item.addons
      : item.addons && typeof item.addons === "object"
        ? Object.values(item.addons).filter(Boolean)
        : [];

      const addonTotal = addonsArray.reduce(
          (sum, ad) => sum + (ad?.price ?? 0),
          0
        );

        item.totalPrice = (item.price + addonTotal) * item.quantity;
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