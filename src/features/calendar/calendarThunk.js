import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetingById, fetchMeetings } from "../../services/meetingApi";

export const getMeetings = createAsyncThunk(
  "meetings/getMeetings",
  async ({page,limit}, { rejectWithValue }) => {
    try {
      
      const res = await fetchMeetings({page,limit});
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getMeetingById = createAsyncThunk(
  "meetings/getMeetingById",
  async (meetingId, { rejectWithValue }) => {
    try {
      const res = await fetchMeetingById(meetingId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);