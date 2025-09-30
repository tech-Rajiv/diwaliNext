import { Card } from "@/components/ui/card";
import React from "react";
import BasicProductCardComp from "./BasicProductCardComp";

function SingleProductBox({ prod }) {
  return (
    <div className="">
      <BasicProductCardComp details={prod} />
    </div>
  );
}

export default SingleProductBox;
