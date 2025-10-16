"use client";

import InsightsOfShop from "@/app/components/InsightsOfShop";
import BackButton from "@/app/components/uiByMe/BackButton";
import SomethingWentWrong from "@/app/components/uiByMe/error/SomethingWentWrong";
import SpinnerLoader from "@/app/components/uiByMe/loader/SpinnerLoader";

import useFetchGetHooks from "@/app/hooks/fecthHooks/useFetchGetHooks";

function page() {
  const { data, loading, error } = useFetchGetHooks("/api/shop/get-insights");

  if (error) {
    return <SomethingWentWrong />;
  }
  return (
    <div className="div">
      <BackButton justOneStepBack={true} />
      {loading && <SpinnerLoader />}
      {data && <InsightsOfShop data={data} />}
      {/* {data && <InsightsOfShop data={data} />} */}
    </div>
  );
}

export default page;
