// src/features/metrics/metricsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getMeetingMetrics } from "./metricsThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeetingMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMeetingMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default metricsSlice.reducer;