import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import addTocartReducers from "./slices/cartProductSlice";
import storeDetailsReducers from "./slices/storeSlice";
import dummyStoreReducers from "./slices/dummyStoreSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cartProducts: addTocartReducers,
    store: storeDetailsReducers,
    dummyStore: dummyStoreReducers,
  },
});
