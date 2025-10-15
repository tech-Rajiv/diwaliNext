import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import addTocartReducers from "./slices/cartProductSlice";
import allProductsReducer from "./slices/allProductSlice";
import storeDetailsReducers from "./slices/storeSlice";
import dummyStoreReducers from "./slices/dummyStoreSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cartProducts: addTocartReducers,
    allProducts: allProductsReducer,
    store: storeDetailsReducers,
    dummyStore: dummyStoreReducers,
  },
});
