"use client";
import React, { useState } from "react";
import FormForAddProducts from "../../components/FormForAddProducts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import BackButton from "../../components/uiByMe/BackButton";
import getProductHelpers from "@/app/helper/getProductHelpers";
import addProductHelpers from "@/app/helper/addProductHelpers";

function AddProductComp() {
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

  const { validaitonOfAllFieldsAreValid, compressedAndCloudinaryUrl } =
    addProductHelpers();
  //this is used to fecth new product if successfully added to products table bcz right now it is cached so i want to manually call this
  const { fetchAllProducts } = getProductHelpers();
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
    try {
      const urlToUpload = await compressedAndCloudinaryUrl(hasImage);
      if (!urlToUpload) throw new Error("failed to get url from cloudinary");
      const updatedFormData = { ...formData, image_url: urlToUpload || "" };
      const res = await fetch("/api/addproduct", {
        method: "POST",
        body: JSON.stringify(updatedFormData),
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();

      fetchAllProducts();

      toast.success("added new product successfully");
      router.push("/");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="wrapper px-5">
        <h2 className="text-center mb-3">Add New Product</h2>
        <div className="wrapper">
          <FormForAddProducts
            loading={loading}
            formData={formData}
            error={error}
            handleOnChangeOfInputs={handleOnChangeOfInputs}
            submitTheForm={submitTheForm}
            handleImageSelect={handleImageSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductComp;
