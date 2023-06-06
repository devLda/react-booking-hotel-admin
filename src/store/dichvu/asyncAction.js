import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAllDV } from "../../api";

export const getAllDV = createAsyncThunk(
  "admin/dichvu",
  async (data, { rejectWithValue }) => {
    const response = await apiAllDV();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
