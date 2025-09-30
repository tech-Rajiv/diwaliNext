import React from "react";
import SingleProductBox from "../components/SingleProductBox";

function page() {
  const allProducts = Array(10).fill({
    title: "product",
    description: "this is good prod",
    price: 50,
  });
  return (
    <div>
      <h2>Products</h2>
      <div className="allPRods grid grid-cols-4 gap-5">
        {allProducts.map((prod, i) => (
          <SingleProductBox key={i} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default page;
