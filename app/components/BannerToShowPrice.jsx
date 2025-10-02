import React from "react";
import { useSelector } from "react-redux";

function BannerToShowPrice() {
  const totalPrice = useSelector((state) => state.addProducts.total_price);
  return (
    <div className="w-full bg-gray-100  p-5">
      <h2 className="text-center text-lg">
        Total: <span className="font-semibold">{totalPrice || 0}</span>
      </h2>
    </div>
  );
}

export default BannerToShowPrice;
