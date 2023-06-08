/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const HDSlice = createSlice({
  name: "hoadon",
  initialState: {
    isLoading: false,
    hoadon: null,
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllHD.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getAllHD.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hoadon = action.payload;
    });

    builder.addCase(action.getAllHD.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// // Action creators are generated for each case reducer function
export const {} = HDSlice.actions;

export default HDSlice.reducer;
