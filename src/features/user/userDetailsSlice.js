import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_PATH } from "../../Constants";
import axios from "axios";

const initialState = {
  token: null,
  userData: null,
  loading: false,
  error: null,
  isLogged: false,
  fetchUserDataCalled: false,
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

//generates pending, fullfilled and rejected action types
export const updateUserData = createAsyncThunk(
  "users/updateData",
  async (userData) => {
    const token = localStorage.getItem("token");
    console.log(userData.passwordUpdate);
    const res = await axios.put(
      API_BASE_PATH + `/user/edit/${userData.passwordUpdate}`,
      userData.userDataSubmit,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  }
);

//generates pending, fullfilled and rejected action types
export const addUserAddress = createAsyncThunk(
  "users/address/add",
  async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      API_BASE_PATH + `/address/add/${data.userId}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  }
);

//generates pending, fullfilled and rejected action types
export const editUserAddress = createAsyncThunk(
  "users/address/edit",
  async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(API_BASE_PATH + `/address/edit`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);

//generates pending, fullfilled and rejected action types
export const deleteUserAddress = createAsyncThunk(
  "users/address/delete",
  async (addressId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(API_BASE_PATH + `/address/${addressId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserDataCall: (state, { payload }) => {
      state.fetchUserDataCalled = payload;
    },
    logOutUser: (state) => {
      state.fetchUserDataCalled = false;
      state.loading = false;
      state.isLogged = false;
      state.userData = null;
    },
    setToken: (state, {payload}) => {
      localStorage.setItem("token", payload);
      state.token = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isLogged = true;
      state.error = null;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      localStorage.removeItem("token");
      state.error = action.error.message;
      state.fetchUserDataCalled = false;
      state.loading = false;
      state.isLogged = false;
      state.userData = null;
    });
    builder.addCase(updateUserData.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.loading = false;
      const addresses = state.userData.addresses;
      action.payload.addresses = addresses;
      state.userData = action.payload;
      state.isLogged = true;
      state.error = null;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.error = action.error.message;
      state.fetchUserDataCalled = false;
      state.loading = false;
      state.isLogged = false;
    });
    builder.addCase(addUserAddress.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.userData.addresses.push(action.payload);
      state.error = null;
    });
    builder.addCase(addUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editUserAddress.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      const addrList = state.userData.addresses.filter(
        (addr) => addr.id !== action.payload.id
      );
      addrList.push(action.payload);
      addrList.sort((a, b) => b - a);
      state.userData.addresses = addrList;
      state.error = null;
    });
    builder.addCase(editUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteUserAddress.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      const addrList = state.userData.addresses.filter(
        (addr) => addr.id !== action.payload
      );
      state.userData.addresses = addrList;
      state.error = null;
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { fetchUserDataCall, logOutUser, setToken } = userSlice.actions;

export default userSlice.reducer;
