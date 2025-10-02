import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import addTocartReducers from "./slices/addProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addProducts: addTocartReducers,
  },
});
