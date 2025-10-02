import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import BasicProductCardComp from "./BasicProductCardComp";

function SingleProductBox({ prod }) {
  const [added, setAdded] = useState(false);
  const handleBuyProduct = () => {
    console.log("clicked buy product");
  };
  return (
    <div className=" rounded-lg">
      <div className="img relative w-32 h-25 bg-gray-100 rounded-lg">
        <div className="btn absolute z-5 bottom-1 right-1 overflow-hidden">
          {added ? (
            <div className="flex gap-2">
              <button className="bg-amber-50 px-1 rounded cursor-pointer">
                -
              </button>
              <div className="p">1</div>
              <button className="bg-amber-50 px-1 rounded cursor-pointer">
                +
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer rounded bg-amber-50 px-2 py-1"
              onClick={handleBuyProduct}
            >
              Buy
            </button>
          )}
        </div>
      </div>
      <div className="infos text-sm p-1 flex flex-col gap-1 mt-1">
        <p>
          <span className="text-xs">Rs</span>
          <span className="font-medium"> {prod?.price}</span>
        </p>
        <h2 className="">{prod?.title.slice(0, 17)}</h2>
        <p>
          <span className="text-xs">1ps</span>
        </p>
        {/* <p>available stock :{prod?.available_stock}</p> */}
      </div>
    </div>
  );
}

export default SingleProductBox;
