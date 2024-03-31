import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_PATH } from "../../Constants";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
  myProducts: [],
  isAllProductFetched: false,
  myProductFetched: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (userToken) => {
    const token = userToken.token;
    const res = await axios.get(
      API_BASE_PATH + `/item/items/${userToken.userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  }
);

export const fetchUserProducts = createAsyncThunk(
  "self/products/fetch",
  async (userToken) => {
    const token = userToken.token;
    const res = await axios.get(API_BASE_PATH + `/item/${userToken.userId}`, {
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
  reducers: {
    fetchAllProductCall: (state, {payload}) => {
      state.isAllProductFetched = payload;
    },
    fetchMyProductCall: (state, {payload}) => {
      state.myProductFetched = payload;
    },
    addMyProducts: (state, {payload}) => {
      state.myProducts.unshift(payload);
    }
  },
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
    builder.addCase(fetchUserProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.myProducts = action.payload;
    });
    builder.addCase(fetchUserProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
      state.myProducts = [];
    });
  },
});
export const {fetchAllProductCall, fetchMyProductCall, addMyProducts} = productSlice.actions;
export default productSlice.reducer;
