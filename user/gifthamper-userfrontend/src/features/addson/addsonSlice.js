import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftBox: null,
  wrapping: null,
  giftCard: null,
};

const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setGiftBox: (state, action) => {
      state.giftBox = action.payload;
    },
    setWrapping: (state, action) => {
      state.wrapping = action.payload;
    },
    setGiftCard: (state, action) => {
      state.giftCard = action.payload;
    },
    clearAddons: (state) => {
      state.giftBox = null;
      state.wrapping = null;
      state.giftCard = null;
    },
  },
});

export const {
  setGiftBox,
  setWrapping,
  setGiftCard,
  clearAddons,
} = addonsSlice.actions;

export default addonsSlice.reducer;