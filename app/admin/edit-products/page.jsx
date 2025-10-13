import EditAllProductsComponents from "@/app/components/EditAllProductsComponents";
import BackButton from "@/app/components/uiByMe/BackButton";
import React from "react";

function page() {
  return (
    <div>
      <BackButton justOneStepBack={true} />
      <div className="wrapper">
        <EditAllProductsComponents />
      </div>
    </div>
  );
}

export default page;
