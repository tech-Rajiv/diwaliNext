import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function ShowCartWrapper() {
  const router = useRouter();
  const handleViewCart = () => {
    router.push("/cart-items");
  };
  const cartProductLength = useSelector(
    (state) => state.cartProducts.products
  ).length;
  return (
    <div className="px-5 py-3 z-100 flex justify-center items-center rounded-full bg-black/80 text-white ">
      <button className="cursor-pointer flex gap-2" onClick={handleViewCart}>
        View Cart ({cartProductLength})
        <ShoppingCart strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default ShowCartWrapper;
