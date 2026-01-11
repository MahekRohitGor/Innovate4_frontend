import { createSlice } from "@reduxjs/toolkit";
import { getMeetings } from "./calendarThunk";

const initialState = {
  meetings: [],
  loading: false,
  error: null,
};

const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload || [];
      })
      .addCase(getMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default meetingSlice.reducer;