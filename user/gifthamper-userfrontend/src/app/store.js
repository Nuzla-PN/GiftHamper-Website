import { configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import addonsReducer from "../features/addson/addsonSlice"
import customizationReducer from  "../features/customization/customizationSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart:cartReducer,
    addons:addonsReducer,
    customization: customizationReducer,
  },
});