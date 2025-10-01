"use client";
import React, { useState } from "react";
import FormForAddProducts from "../components/FormForAddProducts";

function page() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    available_stock: "",
  });
  const handleOnChangeOfInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitTheForm = async () => {
    const res = await fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  };

  // let secretKey;
  // if (typeof window !== "undefined") {
  //   secretKey = localStorage.getItem("secret");
  // }
  // if (!secretKey) {
  //   return "Your are not allowed to add products";
  // }
  return (
    <div className="flex flex-col gap-5 max-w-lg mx-auto">
      <h2>Add Products</h2>
      <FormForAddProducts
        handleOnChangeOfInputs={handleOnChangeOfInputs}
        submitTheForm={submitTheForm}
      />
    </div>
  );
}

export default page;
