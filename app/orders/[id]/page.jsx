"use client";

import BackButton from "@/app/components/uiByMe/BackButton";
import SomethingWentWrong from "@/app/components/uiByMe/error/SomethingWentWrong";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ShoppingBag } from "lucide-react";

function page() {
  const params = useParams();
  const [orderMeta, setOrderMeta] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = params;

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders/get-order-details", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setOrderMeta(data?.meta);
      setProducts(data?.products);
    } catch (error) {
      setError(
        "something went worng while fetching products of this order details"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getOrderDetails(id);
    }
  }, [id]);
  if (error) {
    return <SomethingWentWrong />;
  }

  console.log(orderMeta, "ordermeta");
  console.log(products, "prodcts");
  return (
    <div>
      <BackButton justOneStepBack={true} />
      <div className="wrap max-w-xl mx-auto px-5">
        {loading ? (
          "loading"
        ) : (
          <div className="w-full max-w-md mx-auto my-4 shadow-sm border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="pb-2">
              <div className=" font-medium flex justify-center gap-2 text-gray-700 ">
                <h2 className="text-lg">Details</h2>
              </div>
              <div className="text-sm text-gray-500 mt-3">
                Order #{orderMeta?.id} •{" "}
                {new Date(orderMeta?.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Customer: {orderMeta?.customer_name}
              </div>
              <div className=" mt-2">
                <div className="font-semibold text-gray-700">
                  Total Amount:{" "}
                  <span className="text-lg">₹{orderMeta?.total_amount}</span>
                </div>{" "}
                <div className="line text-sm">
                  Total Qty: {orderMeta?.total_quantity}
                </div>
              </div>
            </div>
            <div className="">
              {products?.map((prod, i) => (
                <div
                  key={prod?.id}
                  className="flex mt-4 justify-between border-b last:border-b-0"
                >
                  <span className="font-medium text-gray-700">{i + 1}.</span>
                  <div className="flex-1 ml-2 sm:ml-4">
                    <div className="flex justify-between">
                      <p className="text-gray-800">{prod?.title}</p>
                      <p className="text-gray-800"> ₹{prod?.line_total}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 mb-4">
                      Qty: {prod?.quantity} - {prod?.sell_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className=" text-center mt-3 mb-3">
              <p className="text-sm text-gray-500 ">
                Thank you for your purchase! We appreciate your business.
              </p>
              <div className="btn flex justify-center mt-2">
                <Button variant="outline" className="flex items-center gap-1">
                  Download Pdf
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
