import { IndianRupee } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function BannerToShowPrice() {
  const totalPrice = useSelector((state) => state.cartProducts.total_price);
  return (
    <div className="w-full bg-gray-100  p-5">
      <h2 className=" flex justify-center items-center">
        <span>Amount : </span>
        <span className="font-semibold ml-2   text-lg">{totalPrice || 0}</span>
        <IndianRupee strokeWidth={2} className="size-4 ml-1" />
      </h2>
    </div>
  );
}

export default BannerToShowPrice;
