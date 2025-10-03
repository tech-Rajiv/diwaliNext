import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function SingleCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[135px] w-[135px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[40px]" />
      </div>
    </div>
  );
}

export default SingleCardSkeleton;
