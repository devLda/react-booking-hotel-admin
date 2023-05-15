import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAllUser } from "../../api/user";

export const getAllUser = createAsyncThunk(
  "admin/user",
  async (data, { rejectWithValue }) => {
    const response = await apiAllUser();
    if (!response.success) return rejectWithValue(response);
    return response.user;
  }
);
