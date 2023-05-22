/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const DPSlice = createSlice({
  name: "datphong",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllDP.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getAllDP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(action.getAllDP.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// // Action creators are generated for each case reducer function
export const {} = DPSlice.actions;

export default DPSlice.reducer;
