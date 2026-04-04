import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customizations: {},   // { message: "", recipientName: "", color: "" }
  selectedAddons: [],   // [{ name, price }]
};

const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    // 🔹 Set any customization field dynamically
    setCustomization: (state, action) => {
      const { key, value } = action.payload;
      state.customizations[key] = value;
    },

    // 🔹 Set all at once (useful when editing or loading saved data)
    setAllCustomizations: (state, action) => {
      state.customizations = action.payload;
    },

    // 🔹 Add addon
    addAddon: (state, action) => {
      const exists = state.selectedAddons.find(
        (item) => item.name === action.payload.name
      );

      if (!exists) {
        state.selectedAddons.push(action.payload);
      }
    },

    // 🔹 Remove addon
    removeAddon: (state, action) => {
      state.selectedAddons = state.selectedAddons.filter(
        (item) => item.name !== action.payload.name
      );
    },

    // 🔹 Toggle addon (BEST for checkbox)
    toggleAddon: (state, action) => {
      const exists = state.selectedAddons.find(
        (item) => item.name === action.payload.name
      );

      if (exists) {
        state.selectedAddons = state.selectedAddons.filter(
          (item) => item.name !== action.payload.name
        );
      } else {
        state.selectedAddons.push(action.payload);
      }
    },

    // 🔹 Clear everything (when changing product / checkout)
    clearCustomization: (state) => {
      state.customizations = {};
      state.selectedAddons = [];
    },
  },
});

export const {
  setCustomization,
  setAllCustomizations,
  addAddon,
  removeAddon,
  toggleAddon,
  clearCustomization,
} = customizationSlice.actions;

export default customizationSlice.reducer;