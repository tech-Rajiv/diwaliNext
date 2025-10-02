import React from "react";
import SingleCardSkeleton from "./SingleCardSkeleton";

function SkeletonShowCards() {
  const skeletonArray = [1, 2, 3, 4, 5];
  return (
    <div className="flex space-x-3 p-5">
      {skeletonArray.map((x) => (
        <SingleCardSkeleton key={x} />
      ))}
    </div>
  );
}

export default SkeletonShowCards;
