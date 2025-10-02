"use client";
import React, { useState } from "react";
import FormForAddProducts from "../components/FormForAddProducts";
import ProtectedComponent from "../components/ProtectedComponent";
import AllCreatedProductByUser from "../components/AllCreatedProductByUser";
import { toast } from "sonner";

function page() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    available_stock: "",
    category_id: "",
  });
  const [loading, setLoading] = useState(false);
  const handleOnChangeOfInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitTheForm = async () => {
    console.log("submitted form", formData);
    setLoading(true);
    try {
      const res = await fetch("/api/addproduct", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      console.log(data, "data");
      toast.success("added new product successfully");
      setFormData({
        title: "",
        description: "",
        price: "",
        available_stock: "",
        category_id: "",
      });
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-center mb-5">Add New Product</h2>
      {/* <ProtectedComponent> */}
      <div className="wrapper max-w-lg mx-auto">
        <FormForAddProducts
          loading={loading}
          handleOnChangeOfInputs={handleOnChangeOfInputs}
          submitTheForm={submitTheForm}
        />
      </div>
      {/* </ProtectedComponent> */}
      {/* <AllCreatedProductByUser /> */}
    </div>
  );
}

export default page;
