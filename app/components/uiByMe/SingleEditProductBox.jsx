import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function SingleEditProductBox({ prod }) {
  const router = useRouter();
  console.log(prod, "proddddd");
  return (
    <div className="bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 py-2 px-5 flex justify-between items-center">
      <div className="info flex gap-2 items-center">
        <div className="div w-12 h-12 rounded-md bg-gray-300 overflow-hidden">
          <img
            src={prod?.image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="name">{prod?.title}</div>
      </div>
      <div className="arr">
        <Button
          variant={"outline"}
          onClick={() => router.push(`/admin/edit-products/${prod.id}`)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default SingleEditProductBox;
