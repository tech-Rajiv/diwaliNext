"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    //login validation will be added
    setLoading(true);
    loginFormData(formData);
  };
  const loginFormData = async (formData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(res?.statusText);
      }
      const data = await res.json();
      localStorage.setItem("token", data?.token);
      dispatch(
        loginSuccess({
          email: data?.user?.email,
          id: data?.user?.id,
          token: data?.token,
        })
      );
      toast.success("Login successfull");
      router.push("/products");
    } catch (error) {
      setError(error?.message ?? "something went bad");
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-96 mx-auto flex flex-col gap-5 px-5">
      <h2 className="font-semibold">Login</h2>
      <form onSubmit={onSubmitForm} className="forms flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleOnChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleOnChange}
        />
        <Button>{loading ? "please wait..." : "Login"}</Button>
      </form>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default page;
