import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userDetailsSlice";
import productReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    productReducer
  },
});
