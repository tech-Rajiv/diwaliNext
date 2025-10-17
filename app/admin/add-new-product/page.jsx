"use client";
import React, { useState } from "react";
import FormForAddProducts from "../../components/FormForAddProducts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import BackButton from "../../components/uiByMe/BackButton";
import getProductHelpers from "@/app/helper/getProductHelpers";
import addProductHelpers from "@/app/helper/addProductHelpers";
import { useSelector } from "react-redux";

function page() {
  const shopId = useSelector((state) => state.store?.storeId);
  console.log("shopId : ", shopId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sell_price: "",
    buy_price: "",
    available_stock: "",
    category_id: "",
    purchased_from: "",
    purchased_single_packets: "",
    purchased_year: "",
    shop_id: shopId,
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
    if (!formData?.shop_id) {
      setFormData((prev) => ({ ...prev, shop_id: shopId }));
    }
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setHasImage(file);
  };

  const submitTheForm = async () => {
    const hasError = validaitonOfAllFieldsAreValid(formData);
    console.log("formData: ", formData);
    console.log("here before toast");
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
      <BackButton justOneStepBack={true} />
      <div className="wrapper px-5 max-w-xl mx-auto">
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

export default page;
