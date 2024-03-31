import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { API_BASE_PATH } from "../../Constants";

const initialState = {
    myOrders: [],
    loading: false,
    error: null,
    fetchCall: false
}

export const fetchMyOrder = createAsyncThunk(
    "myOrder/fetch",
    async (user) => {
        const token = user.token;
        const email = user.email;
        const res = await axios.get(API_BASE_PATH + `/order/${email}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.data;
    }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchMyOrderCall: (state, { payload }) => {
      state.fetchCall = payload;
    },
    addToMyOrder: (state, {payload}) => {
        state.myOrders.unshift(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.myOrders = action.payload;
    });
    builder.addCase(fetchMyOrder.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
      state.myOrders = [];
    });
  },
});

export const {fetchMyOrderCall} = orderSlice.actions;

export default orderSlice.reducer;