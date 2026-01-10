import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Calendar from "../pages/Calender";
import MeetingDetails from "../pages/MeetingDetails";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/Home";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    {/* <Route path="/" element={<Signup />} /> */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />

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
      path="/meeting/:id"
      element={
        <ProtectedRoute>
          <MeetingDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard/:id"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    {/* Fallback */}
    <Route path="/" element={<Navigate to="/calendar" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;