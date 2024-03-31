import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userDetailsSlice";
import productReducer from '../features/products/productsSlice';
import orderReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
    orderReducer
  },
});
