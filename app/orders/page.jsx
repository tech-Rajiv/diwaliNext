"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackButton from "../components/uiByMe/BackButton";
import OrdersLists from "../components/uiByMe/OrdersLists";

function page() {
  const [allOrders, setAllOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userId = useSelector((state) => state?.auth?.id);

  const fetchAllOrders = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      console.log(res, "res order");
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      console.log(data, "orderss");
      setAllOrders(data?.data);
    } catch (error) {
      console.log("hadd errror while getting orders");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchAllOrders(userId);
    }
  }, [userId]);

  return (
    <div>
      <BackButton />
      <div className="wrpper max-w-xl mx-auto">
        {loading ? (
          "loading"
        ) : (
          <div className="px-5 flex flex-col gap-5 ">
            {allOrders?.map((order, index) => (
              <OrdersLists order={order} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
