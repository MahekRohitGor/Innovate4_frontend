import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Calendar from "../pages/Calender";
import MeetingDetails from "../pages/MeetingDetails";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Signup />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route
      path="/calendar"
      element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      }
    />

    <Route
      path="/meeting/:meetingId"
      element={
        <ProtectedRoute>
          <MeetingDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard/:meetingId"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;