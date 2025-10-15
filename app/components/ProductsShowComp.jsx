"use client";
import React from "react";
import SingleProductBox from "./SingleProductBox";
import SkeletonShowCards from "./uiByMe/SkeletonShowCards";
import { useSelector } from "react-redux";

function ProductsShowComp() {
  const { products, loading, error } = useSelector(
    (state) => state.store.allProducts
  );

  console.log("prdcyutstsjh", products, loading, error);
  if (loading) {
    return <SkeletonShowCards />;
  }
  if (error) {
    return "something went wrong";
  }
  return (
    <div className="wrapper mt-2">
      <div className="flex gap-5 overflow-auto px-5 py-2  hide-scrollbar">
        {products?.map((prod, index) => (
          <SingleProductBox key={index} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductsShowComp;
