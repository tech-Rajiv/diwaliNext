"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function OrdersLists({ order }) {
  const router = useRouter();

  console.log(order, "orederrr");
  const handleRoutingToOrderDetails = () => {
    router.push(`/orders/${order?.id}`);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Order Info */}
      <div className="space-y-1 text-sm">
        <p className="font-medium">
          <span className="text-gray-500">Order ID:</span> {order?.id}
        </p>
        <p className="text-gray-500 text-xs flex gap-2">
          <span>{new Date(order?.created_at).toDateString()}</span>|
          <span>{new Date(order?.created_at).toLocaleTimeString()}</span>
        </p>
        <p>
          <span className="text-gray-500">Customer:</span>{" "}
          {order?.customer_name}
        </p>
        <p>
          <span className="text-gray-500">Total:</span> ₹
          {order?.total_amount ?? "10000"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
        <Button
          onClick={handleRoutingToOrderDetails}
          variant="secondary"
          className="flex items-center gap-1"
        >
          View Details <ArrowUpRight size={16} />
        </Button>
        <Button
          onClick={() => console.log("Download order")}
          variant="outline"
          className="flex items-center gap-1"
        >
          Download Pdf
          <ArrowDownToLine size={16} />
        </Button>
      </div>
    </div>
  );
}

export default OrdersLists;
