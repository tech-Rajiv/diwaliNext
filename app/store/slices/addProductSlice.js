import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total_price: null,
  products_quantity: null,
  total_products_quantity: null,
};

export const authSlice = createSlice({
  name: "addProducts",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.products = action.payload.products;
      state.total_price = action.payload.total_price;
      state.products_quantity = action.payload.products_quantity;
      state.total_products_quantity = action.payload.total_products_quantity;
    },
  },
});

export const { addProductToCart } = authSlice.actions;
export default authSlice.reducer;
