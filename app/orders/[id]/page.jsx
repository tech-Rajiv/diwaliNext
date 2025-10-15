"use client";
import BackButton from "@/app/components/uiByMe/BackButton";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const params = useParams();
  const [details, setDetails] = useState({
    products: [],
    total_price: "",
    total_quantity: "",
  });
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
      setDetails((prev) => ({ ...prev, products: data?.data }));
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
  return (
    <div>
      <BackButton justOneStepBack={true} />
      <div className="wrap max-w-xl mx-auto">
        {loading ? (
          "loading"
        ) : (
          <div className="wrp max-w-xl mx-auto px-5">
            <h2 className="font-medium">Order details</h2>
            <div className="infoHead">by:rajiv</div>
            <div className="infos">
              <h2 className="mt-5">products</h2>
              <div className="lists">
                {details?.products.map((prod, i) => (
                  <div key={i} className="p">
                    item{i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
