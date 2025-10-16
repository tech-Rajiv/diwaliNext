"use client";
import { Store } from "lucide-react";
import React from "react";
import MemberInfo from "./uiByMe/MemberInfo";
import PieCharts from "./charts/PieCharts";
import CustomPieChart from "./uiByMe/CustomPieChart";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function InsightsOfShop({ data }) {
  console.log(data, "data shop");
  return (
    <div className="">
      <div className="insights max-w-2xl mx-auto  px-5">
        <div className="memberInfo  ">
          <MemberInfo data={data} />
        </div>
        <div className="pie mt-5">
          <CustomPieChart data={data} />
        </div>
        <div className="flex flex-col justify-center mt-5">
          <Image
            src="/bill.jpg"
            height={100}
            width={200}
            className="w-full rounded-xl"
            alt="shopBill"
          />
          <p className="mt-2 text-center">
            <a href="/bill.jpg" download>
              <Button>Download Image</Button>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InsightsOfShop;
