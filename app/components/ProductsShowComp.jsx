import React from "react";
import SingleProductBox from "./SingleProductBox";

function ProductsShowComp({ allProducts, loading }) {
  if (loading) {
    return "Loading...";
  }
  return (
    <div className="grid grid-cols-2 grid-cols-6 gap-5 ">
      {allProducts?.map((prod, index) => (
        <SingleProductBox key={index} prod={prod} />
      ))}
    </div>
  );
}

export default ProductsShowComp;
