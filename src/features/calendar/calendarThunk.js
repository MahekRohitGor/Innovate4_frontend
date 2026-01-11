import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetings } from "../../services/meetingApi";

export const getMeetings = createAsyncThunk(
  "meetings/getMeetings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchMeetings();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);