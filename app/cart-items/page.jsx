"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartLists from "../components/CartLists";
import BackButton from "../components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";
import { resetCart } from "../store/slices/cartProductSlice";
import { useRouter } from "next/navigation";
import { handleSaveOrder } from "./helper";
import { toast } from "sonner";
import OrderCreatedSuccessfully from "../components/uiByMe/OrderCreatedSuccessfully";

function page() {
  const { products, total_price, total_products_quantity } = useSelector(
    (state) => state.cartProducts
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async () => {
    const saved = await handleSaveOrder({
      products,
      total_price,
      total_products_quantity,
    });

    if (saved.success) {
      dispatch(resetCart());
      toast.success("Order placed");
      router.push("/orders/order-successfull");
      return;
    }

    if (saved.error === 401) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    console.log("❌ Order failed:", saved.message);
    toast.error(saved?.message ?? "something went wrong");
  };
  return (
    <div className="">
      <BackButton />

      <div className="wrapper px-2 max-w-xl mx-auto">
        <h2 className="text-center font-medium mb-4">Cart Items:</h2>
        {products?.map((prod, index) => (
          <CartLists product={prod} key={index} />
        ))}
        <div className="details flex  justify-between px-3 mt-4 border-t pt-4">
          <div className="total flex gap-1">
            <span>Total:</span>
            <span className="font-semibold">
              {total_price ? `${total_price} /-` : "No product"}
            </span>
          </div>
          <div className="save">
            {total_price && <Button onClick={handleSubmit}>Purchase</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
