import React from "react";
import SingleProductBox from "./SingleProductBox";

function ProductsShowComp({ allProducts, loading }) {
  if (loading) {
    return "Loading...";
  }
  return (
    <div className="wrapper">
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-5 ">
        {allProducts?.map((prod, index) => (
          <SingleProductBox key={index} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductsShowComp;
