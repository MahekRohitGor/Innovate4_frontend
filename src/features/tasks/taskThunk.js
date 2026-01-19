import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMeetingTasks } from "../../services/meetingTaskApi";

export const getMeetingTasks = createAsyncThunk(
  "tasks/getMeetingTasks",
  async (meetingId, { rejectWithValue }) => {
    try {
      const res = await fetchMeetingTasks(meetingId);
      const data = res.data.data;

      return {
        discussionItems:
          data.meetingTasks?.[0]?.discussion_items || [],
        shortSummary: data.shortSummary || "",
        longSummary: data.longSummary || "",
        nextActions:data.meetingTasks?.[0]?.next_actions || []
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);