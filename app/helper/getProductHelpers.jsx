import React from "react";
import { useDispatch } from "react-redux";
import { getProductsFromBE } from "../store/slices/allProductSlice";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../store/slices/storeSlice";

function getProductHelpers() {
  const dispatch = useDispatch();
  const fetchAllProducts = async (shopId) => {
    try {
      dispatch(fetchProductsStart());
      const res = await fetch("/api/shop/get-products", {
        method: "POST",
        body: JSON.stringify({ shopId }),
      });
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      dispatch(fetchProductsSuccess(data?.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
  const fetchProductsByCategory = async (categoryId) => {
    try {
      dispatch(fetchProductsStart());
      const res = await fetch("/api/shop/get-products-by-category", {
        method: "POST",
        body: JSON.stringify({ categoryId }),
      });
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      dispatch(fetchProductsSuccess(data?.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
  const fetchAllCategories = async () => {
    try {
      dispatch(getProductsFromBE({ loading: true }));
      const res = await fetch("/api/category/getcategories");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      dispatch(getProductsFromBE({ allCategories: data?.data }));
    } catch (error) {
      dispatch(getProductsFromBE({ error: error.message }));
    } finally {
      dispatch(getProductsFromBE({ loading: false }));
    }
  };

  return {
    fetchAllProducts,
    fetchProductsByCategory,
    fetchAllCategories,
  };
}

export default getProductHelpers;
