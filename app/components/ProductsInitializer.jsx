"use client";
import React, { useEffect } from "react";
import getProductHelpers from "../helper/getProductHelpers";

function ProductsInitializer({ children }) {
  const { fetchAllProducts, fetchAllCategories } = getProductHelpers();

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);
  return children;
}

export default ProductsInitializer;
