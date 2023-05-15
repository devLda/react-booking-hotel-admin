/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    allUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllUser.pending, (state) => {
      state.isLoading = true;
      state.statusPhong = "pending";
    });

    builder.addCase(action.getAllUser.fulfilled, (state, action) => {
      console.log("action ", action);
      state.isLoading = false;
      state.statusPhong = "resolved";
      state.allUser = action.payload;
    });

    builder.addCase(action.getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.statusPhong = "rejected";
      state.errorMessage = action.payload.message;
    });
  },
});

// // Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
