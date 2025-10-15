import React, { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";
import SkeletonForCategories from "./uiByMe/SkeletonForCategories";
import { useSelector } from "react-redux";

function Category() {
  const { categories, loading, error } = useSelector(
    (state) => state.store.allCategories
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="font-medium">Products</h2>
      <div className="all flex gap-5 mt-5 overflow-auto py-2  hide-scrollbar">
        {loading && <SkeletonForCategories />}
        {categories?.map((category, index) => (
          <div key={index}>
            <SingleCategory category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
