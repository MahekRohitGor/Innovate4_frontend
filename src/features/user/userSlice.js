import { createSlice } from "@reduxjs/toolkit";
import { signup, login,getUserInfo } from "./userThunks";
const token = localStorage.getItem("token");
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLogin: !!token,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLogin = false;
      state.error = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.data.user;  
          console.log("Signup fulfilled action payload:", action.payload.data.user);
          localStorage.setItem("token", JSON.stringify(action.payload.data.token));
          state.isAuthenticated = true;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Login fulfilled action payload:", action.payload);
        if (action.payload.data.success === true) {
          state.token = action.payload.data.data.token;
          state.user = action.payload.data.data.user;
          localStorage.setItem("token", JSON.stringify(action.payload.data.data.token));
          state.isLogin = true;
        } else {
          state.user = null;
          state.token = null;
          state.error = action.payload?.message || "Login failed";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;