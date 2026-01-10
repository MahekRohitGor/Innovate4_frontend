import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "./userThunks";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLogin: false,
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
          state.user = action.payload.data;
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
          state.user = action.payload.data.email;
          state.token = action.payload.data.data.token;
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
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;