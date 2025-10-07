"use client";
import React, { useState } from "react";
import FormForAddProducts from "../components/FormForAddProducts";
import ProtectedComponent from "../components/ProtectedComponent";
import AllCreatedProductByUser from "../components/AllCreatedProductByUser";
import { toast } from "sonner";
import {
  getUrlFromCloudinary,
  validaitonOfAllFieldsAreValid,
} from "../helper/addProductHelpers";
import { useRouter } from "next/navigation";

function page() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    available_stock: "",
    category_id: "",
  });
  const [hasImage, setHasImage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOnChangeOfInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError();
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setHasImage(file);
  };

  const submitTheForm = async () => {
    const hasError = validaitonOfAllFieldsAreValid(formData);
    if (hasError) {
      toast.error("all fields are required");
      setError("all fields are required");
      return;
    }
    setLoading(true);
    const urlfromCloudinary = await getUrlFromCloudinary(hasImage);
    const updatedFormData = { ...formData, image_url: urlfromCloudinary || "" };
    console.log("updatedFormData: ", updatedFormData);

    try {
      const res = await fetch("/api/addproduct", {
        method: "POST",
        body: JSON.stringify(updatedFormData),
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      console.log(data, "data");
      toast.success("added new product successfully");
      router.push("/products");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 mt-5">
      <h2 className="text-center mb-5">Add New Product</h2>
      {/* <ProtectedComponent> */}
      <div className="wrapper max-w-lg mx-auto">
        <FormForAddProducts
          loading={loading}
          formData={formData}
          error={error}
          handleOnChangeOfInputs={handleOnChangeOfInputs}
          submitTheForm={submitTheForm}
          handleImageSelect={handleImageSelect}
        />
      </div>
      {/* </ProtectedComponent> */}
    </div>
  );
}

export default page;
