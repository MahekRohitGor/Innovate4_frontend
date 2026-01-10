import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetingDashboard } from "../../services/meetingApi";

export const getDashboardData = createAsyncThunk(
  "dashboard/getData",
  async (meetingId, thunkAPI) => {
    try {
      const response = await fetchMeetingDashboard(meetingId);
      return response;
    } catch (error) {
        console.log(error);
      return thunkAPI.rejectWithValue("Failed to load dashboard");
    }
  }
);