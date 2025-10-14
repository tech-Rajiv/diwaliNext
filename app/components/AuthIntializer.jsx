"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

function AuthIntializer({ children }) {
  const dispatch = useDispatch();
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
          id: data?.user?.id,
          email: data?.user?.email,
          token: data?.token,
        })
      );
    } catch (error) {
      console.log("auth failed by authInitializer");
    }
  };
  useEffect(() => {
    callAndSetUserIfFound();
  }, []);
  return children;
}

export default AuthIntializer;
