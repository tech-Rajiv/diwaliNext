import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function SkeletonForCategories() {
  const categoryItems = [1, 2, 3, 4];
  return (
    <div className="flex gap-5 mb-5">
      {categoryItems.map((x) => (
        <Skeleton key={x} className="h-[60px] w-[60px] rounded-xl" />
      ))}
    </div>
  );
}

export default SkeletonForCategories;
