/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const phongSlice = createSlice({
  name: "phong",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllPhong.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getAllPhong.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(action.getAllPhong.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// // Action creators are generated for each case reducer function
export const {} = phongSlice.actions;

export default phongSlice.reducer;
