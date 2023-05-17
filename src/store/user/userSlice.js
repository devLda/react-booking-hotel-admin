/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    isLoggedIn: false,
    token: null,
    allUser: null,
    statusUser: 'pending'
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
      state.statusUser = "pending";
    });

    builder.addCase(action.getAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statusUser = "resolved";
      state.allUser = action.payload;
    });

    builder.addCase(action.getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.statusUser = "rejected";
      state.errorMessage = action.payload.mes;
    });
  },
});

// // Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
