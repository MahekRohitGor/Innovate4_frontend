import { createSlice } from "@reduxjs/toolkit";
import { getMeetingTasks } from "./taskThunk";

const initialState = {
  discussionItems: [],
  shortSummary: "",
  longSummary: "",
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeetingTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.discussionItems = action.payload.discussionItems;
        state.shortSummary = action.payload.shortSummary;
        state.longSummary = action.payload.longSummary;
      })
      .addCase(getMeetingTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;