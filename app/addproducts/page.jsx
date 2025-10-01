"use client";
import React, { useState } from "react";
import FormForAddProducts from "../components/FormForAddProducts";
import ProtectedComponent from "../components/ProtectedComponent";

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

  return (
    <div className="">
      <h2 className="text-center mb-5">Add Products</h2>
      <ProtectedComponent>
        <div className="wrapper max-w-lg mx-auto">
          <FormForAddProducts
            handleOnChangeOfInputs={handleOnChangeOfInputs}
            submitTheForm={submitTheForm}
          />
        </div>
      </ProtectedComponent>
    </div>
  );
}

export default page;
