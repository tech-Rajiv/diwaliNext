import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeName: "",
  storeId: "",
  allProducts: {
    products: [],
    loading: false,
    error: null,
  },
  allCategories: {
    categories: [],
    loading: false,
    error: null,
  },
};

export const storeDetails = createSlice({
  name: "storeDetails",
  initialState,
  reducers: {
    // ✅ Set store name
    setStoreName: (state, action) => {
      state.storeName = action.payload;
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },

    // ✅ PRODUCTS - loading / success / error
    fetchProductsStart: (state) => {
      state.allProducts.loading = true;
      state.allProducts.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.allProducts.loading = false;
      state.allProducts.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.allProducts.loading = false;
      state.allProducts.error = action.payload;
    },

    // ✅ CATEGORIES - loading / success / error
    fetchCategoriesStart: (state) => {
      state.allCategories.loading = true;
      state.allCategories.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.allCategories.loading = false;
      state.allCategories.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.allCategories.loading = false;
      state.allCategories.error = action.payload;
    },

    removingStore: () => initialState,
  },
});

export const {
  setStoreName,
  setStoreId,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  removingStore,
} = storeDetails.actions;

export default storeDetails.reducer;
