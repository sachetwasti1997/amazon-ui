import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userDetailsSlice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
