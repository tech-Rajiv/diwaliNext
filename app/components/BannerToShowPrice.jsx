import { BadgeIndianRupee } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function BannerToShowPrice() {
  const totalPrice = useSelector((state) => state.cartProducts.total_price);
  return (
    <div className="w-full bg-gray-100  p-5">
      <h2 className=" flex justify-center  gap-2  text-lg">
        Total: <span className="font-semibold ">{totalPrice || 0}</span>
        <BadgeIndianRupee strokeWidth={1.5} />
      </h2>
    </div>
  );
}

export default BannerToShowPrice;
