import React from "react";
import { useDispatch } from "react-redux";
import { getProductsFromBE } from "../store/slices/allProductSlice";

function getProductHelpers() {
  const dispatch = useDispatch();
  const fetchAllProducts = async () => {
    try {
      dispatch(getProductsFromBE({ loading: true }));
      const res = await fetch(`/api/products`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      dispatch(getProductsFromBE({ products: data?.data }));
    } catch (error) {
      dispatch(getProductsFromBE({ error: error.message }));
    } finally {
      dispatch(getProductsFromBE({ loading: false }));
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
    fetchAllCategories,
  };
}

export default getProductHelpers;
