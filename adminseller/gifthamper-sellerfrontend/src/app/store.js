import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import orderReducer from '../features/orders/orderSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      products: productReducer,
      orders: orderReducer,
    },
  });

export const store = makeStore();
