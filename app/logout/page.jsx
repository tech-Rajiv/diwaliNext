"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handelLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error();
      }
      dispatch(logout());
      router.push("/");
      toast.success("Logout successfull");
    } catch (error) {
      toast.error("something went wrong");
      setError("failed to logout");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handelLogout();
  }, []);
  if (loading) {
    return "Logging you out..";
  }
  if (error) {
    return "something went wrong: failed to logout";
  }
}

export default page;
