import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: false,
  allCategories: [],
};

export const allProducts = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    getProductsFromBE: (state, action) => {
      if (action.payload.products !== undefined)
        state.products = action.payload.products;
      if (action.payload.loading !== undefined)
        state.loading = action.payload.loading;
      if (action.payload.error !== undefined)
        state.error = action.payload.error;
      if (action.payload.allCategories !== undefined)
        state.allCategories = action.payload.allCategories;
    },
  },
});

export const { getProductsFromBE } = allProducts.actions;
export default allProducts.reducer;
