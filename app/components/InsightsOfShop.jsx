"use client";
import { Store } from "lucide-react";
import React from "react";
import MemberInfo from "./uiByMe/MemberInfo";
import PieCharts from "./charts/PieCharts";
import CustomPieChart from "./uiByMe/CustomPieChart";

function InsightsOfShop({ data }) {
  console.log(data, "data shop");
  return (
    <div className="">
      <div className="insights max-w-2xl mx-auto  px-5">
        <div className="memberInfo  ">
          <MemberInfo data={data} />
        </div>
        <div className="pie mt-5">
          {/* <PieCharts data={data} />
           */}
          <CustomPieChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default InsightsOfShop;
