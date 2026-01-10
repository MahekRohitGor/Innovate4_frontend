import { createAsyncThunk } from "@reduxjs/toolkit";
import {secureFetch} from "../../utils/secureFetch";

export const signup = createAsyncThunk(
  "user/signup",
  async (req_data, { rejectWithValue }) => {
    try {
      const response = await secureFetch(
        "http://localhost:3000/api/user/signup",
        req_data,
        "POST"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk('user/login', async(req_data) => {
    const url = `http://localhost:3000/api/user/Login`;

    const response = await secureFetch(url, req_data, 'POST');
    return response;
})