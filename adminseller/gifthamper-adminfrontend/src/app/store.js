'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sellersReducer from '../features/sellers/sellerSlice';
import ordersReducer from '../features/orders/orderSlice';
import couponsReducer from '../features/coupons/couponSlice';
import addonsReducer from '../features/addons/addonSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      sellers: sellersReducer,
      orders: ordersReducer,
      coupons: couponsReducer,
      addons: addonsReducer,
    },
  });

let store;

export const getStore = () => {
  if (!store) {
    store = makeStore();
  }
  return store;
};
