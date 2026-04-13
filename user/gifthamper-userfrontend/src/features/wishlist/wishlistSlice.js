// import { createSlice } from "@reduxjs/toolkit";

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: { items: JSON.parse(localStorage.getItem("wishlist")) || [], },
//   reducers: {
//     toggleWishlist: (state, action) => {
//       const exists = state.items.find(i => i.id === action.payload.id);
//       if (exists) {
//         state.items = state.items.filter(i => i.id !== action.payload.id);
//       } else {
//         state.items.push(action.payload);
//       }
//       localStorage.setItem("wishlist", JSON.stringify(state.items));
//     }
//   }
// });

// export const { toggleWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";



const wishlistSlice = createSlice({
  name: "wishlist",
  initialState : {items:JSON.parse(localStorage.getItem("wishlist"))||[],},
  reducers: {

    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists  = state.items.some((i) => i.id === product.id);
      if (!exists) {
        state.items.push({
          ...product,
          addedOn: new Date().toISOString(), 
        });
      }
    },

   
    removeFromWishlist: (state, action) => {
      const id = action.payload;              // pass the product id
      state.items = state.items.filter((i) => i.id !== id);
    },

   
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index   = state.items.findIndex((i) => i.id === product.id);
      if (index === -1) {
        state.items.push({ ...product, addedOn: new Date().toISOString() });
      } else {
        state.items.splice(index, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

   
    clearWishlist: (state) => {
      state.items = [];
    },

    removeMultipleFromWishlist: (state, action) => {
      const ids = action.payload;            // array of product ids
      state.items = state.items.filter((i) => !ids.includes(i.id));
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  removeMultipleFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlistItems  = (state) => state.wishlist.items;
export const selectWishlistCount  = (state) => state.wishlist.items.length;
export const selectWishlistIds    = (state) => state.wishlist.items.map((i) => i.id);
export const selectIsWishlisted   = (id)    => (state) =>
  state.wishlist.items.some((i) => i.id === id);
