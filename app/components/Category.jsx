import React, { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";
import SkeletonForCategories from "./uiByMe/SkeletonForCategories";
import { useSelector } from "react-redux";

function Category({ selectedCategoryId, setSelectedCategoryId }) {
  const { allCategories, loading, error } = useSelector(
    (state) => state.allProducts
  );

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2 className="font-medium">Products</h2>
      <div className="all flex gap-5 mt-5 overflow-auto py-2  hide-scrollbar">
        {loading && <SkeletonForCategories />}
        {allCategories?.map((category, index) => (
          <div key={index}>
            <SingleCategory
              category={category}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
