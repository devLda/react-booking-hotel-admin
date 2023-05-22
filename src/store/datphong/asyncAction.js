import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMultiDataDP } from "../../api";

export const getAllDP = createAsyncThunk(
  "admin/phong",
  async (data, { rejectWithValue }) => {
    const response = await apiMultiDataDP();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
