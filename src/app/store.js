import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import metricsReducer from "../features/metrics/metricSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    meetings: calendarReducer,
    metrics: metricsReducer,
  },
});