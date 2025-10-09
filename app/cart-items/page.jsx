"use client";
import React from "react";
import { useSelector } from "react-redux";
import CartLists from "../components/CartLists";
import BackButton from "../components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";

function page() {
  const { products, total_price } = useSelector((state) => state.cartProducts);

  return (
    <div className="">
      <BackButton />

      <div className="wrapper px-2 max-w-xl mx-auto">
        <h2 className="text-center font-medium mb-4">Cart Items:</h2>
        {products?.map((prod, index) => (
          <CartLists product={prod} key={index} />
        ))}
        <div className="details flex  justify-between px-3 mt-4 border-t pt-4">
          <div className="total flex">
            <span>Total:</span>
            <span>{total_price ? `${total_price} /-` : "No product"}</span>
          </div>
          <div className="save">
            <Button>Purchase</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
