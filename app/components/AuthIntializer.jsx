"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import getProductHelpers from "../helper/getProductHelpers";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  setStoreId,
  setStoreName,
} from "../store/slices/storeSlice";
import { toast } from "sonner";

function AuthIntializer({ children }) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state?.auth?.id);
  const callAndSetUserIfFound = async () => {
    try {
      const res = await fetch("/api/me");

      if (!res.ok) {
        throw new Error();
      }
      if (!res.ok) {
        throw new Error("Authentcation. failed");
      }
      const data = await res.json();
      dispatch(
        loginSuccess({
          id: data?.user?.sub,
          email: data?.user?.email,
          token: data?.token,
        })
      );
    } catch (error) {
      //call products and show dummy store.
      console.log("auth failed by authInitializer");
    }
  };

  const getStoreDetails = async (userId) => {
    try {
      dispatch(fetchProductsStart());
      dispatch(fetchCategoriesStart());
      const res = await fetch("/api/shop/get-details", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) {
        throw Error;
      }
      const data = await res.json();

      dispatch(setStoreName(data?.shopDetails?.working_shop_name));
      dispatch(setStoreId(data?.shopDetails?.working_shop_name));
      dispatch(fetchProductsSuccess(data?.productData));
      dispatch(fetchCategoriesSuccess(data?.categoryData));
    } catch (error) {
      toast.error("someting went wrong");
      dispatch(fetchProductsFailure("failed to add data"));
    }
  };
  console.log("comp of authinitzler");

  useEffect(() => {
    console.log("run in efect of get store detail");
    if (userId) {
      console.log("shopd etails actual run");
      getStoreDetails(userId);
    }
  }, [userId]);
  useEffect(() => {
    callAndSetUserIfFound();
  }, []);
  return children;
}

export default AuthIntializer;
