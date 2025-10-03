"use client";
import React from "react";
import { useSelector } from "react-redux";
import ShowCartItems from "../components/ShowCartItems";

function page() {
  const cartProducts = useSelector((state) => state.addProducts.products);

  return (
    <div>
      <ShowCartItems cartItems={cartProducts} />
    </div>
  );
}

export default page;
