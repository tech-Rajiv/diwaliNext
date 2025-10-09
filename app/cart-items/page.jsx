"use client";
import React from "react";
import { useSelector } from "react-redux";
import CartLists from "../components/CartLists";
import BackButton from "../components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";

function page() {
  const { products } = useSelector((state) => state.cartProducts);

  return (
    <div className="">
      <BackButton />

      <div className="wrapper px-2 max-w-xl mx-auto">
        <h2 className="text-center font-medium mb-5">Cart Items</h2>
        {products?.map((prod, index) => (
          <CartLists product={prod} key={index} />
        ))}
        <div className="save mt-5 flex justify-end">
          <Button>Save to history</Button>
        </div>
      </div>
    </div>
  );
}

export default page;
