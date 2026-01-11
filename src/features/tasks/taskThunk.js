import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetingTasks } from "../../services/meetingTaskApi";

export const getMeetingTasks = createAsyncThunk(
  "tasks/getMeetingTasks",
  async (meetingId, { rejectWithValue }) => {
    try {
      const res = await fetchMeetingTasks(meetingId);
      console.log("Fetched Meeting Tasks:", res);
      return res.data.data.meetingTasks[0]?.discussion_items || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);