import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMultiDataHD } from "../../api";

export const getAllHD = createAsyncThunk(
  "admin/hoadon",
  async (data, { rejectWithValue }) => {
    const response = await apiMultiDataHD();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
