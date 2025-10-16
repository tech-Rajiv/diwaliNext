"use client";
import { useSelector } from "react-redux";
import SingleEditProductBox from "./uiByMe/SingleEditProductBox";
import useFetchGetHooks from "../hooks/fecthHooks/useFetchGetHooks";
import { useEffect } from "react";
import { fetchProductsSuccess } from "../store/slices/storeSlice";

function EditAllProductsComponents() {
  const { loading, error, data } = useFetchGetHooks(
    "/api/shop/get-all-products"
  );

  useEffect(() => {
    if (data) {
      fetchProductsSuccess(data);
    }
  }, [data]);
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return "error while getting all products";
  }

  return (
    <div className="">
      <div className="wrap flex flex-col gap-2">
        {data?.map((prod) => (
          <SingleEditProductBox prod={prod} key={prod?.id} />
        ))}
      </div>
    </div>
  );
}

export default EditAllProductsComponents;
