import React from "react";
import SingleProductBox from "./SingleProductBox";

function ProductsShowComp({ allProducts, loading }) {
  if (loading) {
    return "Loading...";
  }
  return (
    <div className="wrapper mt-2">
      <div className="flex gap-4 overflow-auto px-5 py-2  hide-scrollbar">
        {allProducts?.map((prod, index) => (
          <SingleProductBox key={index} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductsShowComp;
