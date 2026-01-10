import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
});