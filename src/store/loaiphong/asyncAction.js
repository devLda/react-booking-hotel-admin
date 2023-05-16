import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiAllLP} from "../../api";

export const getAllLP = createAsyncThunk(
  "admin/loaiphong",
  async (data, { rejectWithValue }) => {
    const response = await apiAllLP();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
