import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeName: "Guest store",
  products: [],
  allCategories: [],
  cartProducts: [],
};

export const dummStore = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    dummyStoreDetails: (state, action) => {
      if (action.payload.storeName !== undefined)
        state.storeName = action.payload.storeName;
      if (action.payload.products !== undefined)
        state.products = action.payload.products;
      if (action.payload.allCategories !== undefined)
        state.allCategories = action.payload.allCategories;
      if (action.payload.cartProducts !== undefined)
        state.cartProducts = action.payload.cartProducts;
    },
  },
});

export const { setStoreDetails } = dummStore.actions;
export default dummStore.reducer;
