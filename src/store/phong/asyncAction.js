import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMultiDataPhong } from "../../api";

export const getAllPhong = createAsyncThunk(
  "admin/phong",
  async (data, { rejectWithValue }) => {
    const response = await apiMultiDataPhong();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
