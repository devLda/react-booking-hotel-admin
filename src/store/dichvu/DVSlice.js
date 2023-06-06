/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const LPSlice = createSlice({
  name: "dichvu",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllDV.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getAllDV.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(action.getAllDV.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// // Action creators are generated for each case reducer function
export const {} = LPSlice.actions;

export default LPSlice.reducer;
