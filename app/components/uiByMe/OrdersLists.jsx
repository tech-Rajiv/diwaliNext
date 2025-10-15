import { Button } from "@/components/ui/button";
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Item } from "@radix-ui/react-select";
import { ArrowUpRight, BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function OrdersLists({ order }) {
  const router = useRouter();
  console.log(order);
  const handleRoutingToOrderDetails = () => {
    router.push(`orders/${order?.id}`);
  };
  return (
    <div className="outline flex sm:justify-between p-3 rounded-md">
      <div className="info">
        <p className="text-sm flex gap-2">
          <span>id:</span> <span>{order?.id}</span>
        </p>
        <p className="">
          <span>to:</span> <span>{order?.customer_name}</span>
        </p>
        <p>
          <span>total amount:</span>{" "}
          <span>{order?.total_amount ?? "10000"}</span>
        </p>
      </div>
      <div className="btn">
        <Button onClick={handleRoutingToOrderDetails} variant={"outline"}>
          view Details
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
}

export default OrdersLists;
