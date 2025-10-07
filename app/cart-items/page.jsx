"use client";
import React from "react";
import { useSelector } from "react-redux";
import ShowCartItems from "../components/ShowCartItems";
import CartLists from "../components/CartLists";
import BackButton from "../components/uiByMe/BackButton";

function page() {
  const { products } = useSelector((state) => state.addProducts);

  return (
    <div className="">
      <BackButton />
      <div className="wrapper px-2">
        {products?.map((prod, index) => (
          <CartLists product={prod} key={index} />
        ))}
      </div>
    </div>
  );
}

export default page;
