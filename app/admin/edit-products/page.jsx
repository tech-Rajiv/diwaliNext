import EditAllProductsComponents from "@/app/components/EditAllProductsComponents";
import BackButton from "@/app/components/uiByMe/BackButton";
import React from "react";

function page() {
  return (
    <div>
      <BackButton justOneStepBack={true} />
      <h2 className="text-center font-medium">Edit product</h2>
      <div className="wrapper mt-5 max-w-xl mx-auto">
        <EditAllProductsComponents />
      </div>
    </div>
  );
}

export default page;
