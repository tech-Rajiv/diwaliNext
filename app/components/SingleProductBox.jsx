import { Card } from "@/components/ui/card";
import React from "react";
import BasicProductCardComp from "./BasicProductCardComp";

function SingleProductBox({ prod }) {
  return (
    <div className="h-50 outline shadow rounded-lg p-5 mt-2">
      <h2>Title:{prod?.title}</h2>
      <p>price :{prod?.price}</p>
      <p>available stock :{prod?.available_stock}</p>
    </div>
  );
}

export default SingleProductBox;
