"use client";
import React from "react";
import SingleProductBox from "./SingleProductBox";
import SkeletonShowCards from "./uiByMe/SkeletonShowCards";
import { useSelector } from "react-redux";

function ProductsShowComp() {
  const { products, loading, error } = useSelector(
    (state) => state.store.allProducts
  );

  if (loading) {
    return <SkeletonShowCards />;
  }
  if (error) {
    return "something went wrong";
  }
  return (
    <div className="wrapper mt-2">
      <h2 className="mb-3 font-medium px-5 ">Products</h2>
      <div
        className="
      flex gap-y-10 gap-8 overflow-x-auto px-5 py-2 hide-scrollbar
      sm:grid sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5
    "
      >
        {products?.map((prod, index) => (
          <SingleProductBox key={index} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductsShowComp;
