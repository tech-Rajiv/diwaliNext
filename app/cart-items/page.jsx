"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartLists from "../components/CartLists";
import BackButton from "../components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";
import { resetCart } from "../store/slices/cartProductSlice";
import { useRouter } from "next/navigation";
import { handleSaveOrder } from "./helper";
import { toast } from "sonner";
import OrderCreatedSuccessfully from "../components/uiByMe/OrderCreatedSuccessfully";
import { BadgeDollarSignIcon, CircleCheckBig, DollarSign } from "lucide-react";
import DialogBoxWithInput from "../components/addproductcomps/DialogBoxWithInput";
import Script from "next/script";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function page() {
  const { products, total_price, total_products_quantity } = useSelector(
    (state) => state.cartProducts
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: Math.floor(total_price * 100),
      currency: "INR",
      name: "Test Store",
      description: "Testing Razorpay Checkout",
      handler: (response) => {
        router.push("/orders/order-successfull");

        // alert(`Payment successful: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleSubmit = async (cname, cphone) => {
    const updatedProducts = products.map((x) => ({
      ...x,
      line_total: x.quantity * x.sell_price,
    }));
    console.log(updatedProducts, total_price, total_products_quantity);

    setLoading(true);
    const saved = await handleSaveOrder({
      customer_name: cname,
      customer_phone: cphone,
      products: updatedProducts,
      total_price,
      total_products_quantity,
    });
    setLoading(false);
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

    toast.error(saved?.message ?? "something went wrong");
  };
  const handleStripePayment = async () => {
    const res = await fetch("/api/create-checkout-session", { method: "POST" });
    const data = await res.json();
    console.log(res, "res");
    console.log(data, "data");
    if (data.url) {
      window.location.href = data.url; // ✅ direct redirect
    } else {
      alert("Failed to create checkout session");
    }
  };
  return (
    <div className="">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <BackButton />

      <div className="wrapper px-2 max-w-xl mx-auto">
        <h2 className="text-center font-medium mb-4">Cart Items:</h2>
        {products?.map((prod, index) => (
          <CartLists product={prod} key={index} />
        ))}
        {!total_price && <p>no items </p>}
        {total_price && (
          <div className="details flex  justify-between px-3 mt-4 border-t pt-4">
            <div className="total flex gap-1">
              <span>Total quantity:</span>
              <span className="font-semibold">{total_products_quantity}</span>
            </div>
            <div className="total flex gap-1">
              <span>Total amount:</span>
              <span className="font-semibold">{total_price}</span>
            </div>
          </div>
        )}

        <div className="save mt-5 flex justify-between ">
          {total_price && (
            <Button variant={"outline"} onClick={handlePayment}>
              Test-RazorPay {total_price} <BadgeDollarSignIcon />
            </Button>
          )}
          {/* {total_price && (
            <Button variant={"outline"} onClick={handleStripePayment}>
              Test-StripePay {total_price} <BadgeDollarSignIcon />
            </Button>
          )} */}
          {total_price && (
            <DialogBoxWithInput
              name={"Create order"}
              onClickYesFn={handleSubmit}
              loading={loading}
              content={"pay on the Qr below"}
              heading={"Order details"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
