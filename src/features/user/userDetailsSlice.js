import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_PATH } from "../../Constants";
import axios from "axios";

const initialState = {
  userData: null,
  loading: false,
  error: null,
  isLogged: false,
  fetchUserDataCalled: false
};

//generates pending, fullfilled and rejected action types
export const fetchUserData = createAsyncThunk("users/fetchData", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_BASE_PATH + "/user/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserDataCall: (state) => {
      state.fetchUserDataCalled = true;
    },
    logOutUser: (state) => {
      state.isLogged = !state.isLogged
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isLogged = true;
      state.error = null;
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      localStorage.removeItem("token");
      state.error = action.error.message;
      state.fetchUserDataCalled = false;
      state.loading = false;
      state.isLogged = false;
      state.userData = {};
    })
  },
});

export const { fetchUserDataCall, logOutUser } = userSlice.actions;

export default userSlice.reducer;
