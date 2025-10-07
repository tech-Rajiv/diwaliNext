import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function ShowCartWrapper() {
  const router = useRouter();
  const handleViewCart = () => {
    router.push("/cart-items");
  };
  return (
    <div className="px-5 py-3 flex justify-center items-center rounded-full bg-black/80 text-white ">
      <button className="cursor-pointer" onClick={handleViewCart}>
        View Cart items
      </button>
    </div>
  );
}

export default ShowCartWrapper;
