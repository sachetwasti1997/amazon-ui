import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_PATH } from "../../Constants";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (userId) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_BASE_PATH + `/item/items/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
      state.products = [];
    });
  },
});

export default productSlice.reducer;
