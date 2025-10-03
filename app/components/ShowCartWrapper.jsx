import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function ShowCartWrapper() {
  const router = useRouter();
  const handleViewCart = () => {
    router.push("/cart-items");
  };
  return (
    <div className="w-60 py-3 flex justify-center items-center rounded-full bg-gray-300">
      <button className="" onClick={handleViewCart}>
        View Cart items
      </button>
    </div>
  );
}

export default ShowCartWrapper;
