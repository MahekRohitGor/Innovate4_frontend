// src/features/metrics/metricsThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetingMetrics } from "../../services/metricsApi";

export const getMeetingMetrics = createAsyncThunk(
  "metrics/getMeetingMetrics",
  async (meetingId, { rejectWithValue }) => {
    try {
      const res = await fetchMeetingMetrics(meetingId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);