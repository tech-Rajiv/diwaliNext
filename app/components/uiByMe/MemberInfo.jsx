import { User, Users } from "lucide-react";
import React from "react";
import { Store } from "lucide-react";
function MemberInfo({ data }) {
  return (
    <div className="">
      <div className="shopDetail flex flex-col gap-2">
        <h2 className="font-medium ">
          Shop details: {data?.shopDetails?.shop_name}
        </h2>
        <div className="row flex gap-2">
          <span>Total memebers:</span>
          <span>{data?.shopDetails?.shop_members?.members_count}</span>
        </div>
        <div className="row flex gap-2">
          <span>Created at:</span>
          <span>
            {new Date(data?.shopDetails?.shop_created_at).toDateString()}
          </span>
        </div>
        <div className="row gap-2">
          <div>Members:</div>
          <div className="mem flex gap-3">
            {data?.shopDetails?.shop_members?.members?.map((x) => (
              <p className="flex-nowrap">{x.name},</p>
            ))}
          </div>
        </div>
        <div className="row flex gap-2">
          <span>Total budget:</span>
          <span>{data?.shopDetails?.total_investment}</span>
        </div>
        {/* <div className="row flex gap-2">
          <div>Categories:</div>
          {data?.productDetails?.categories?.map((x) => (
            <p>{x.name} ,</p>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default MemberInfo;
