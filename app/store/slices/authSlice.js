import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  email: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
