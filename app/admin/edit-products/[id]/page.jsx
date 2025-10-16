"use client";
import EditProduct from "@/app/components/EditProduct";
import BackButton from "@/app/components/uiByMe/BackButton";
import addProductHelpers from "@/app/helper/addProductHelpers";
import getProductHelpers from "@/app/helper/getProductHelpers";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function page() {
  const params = useParams();
  const { id } = params;
  const [formData, setFormData] = useState();
  const [changedImage, setChangedImage] = useState();
  const [loading, setLoading] = useState({
    submitLoading: false,
    deleteLoading: false,
  });
  const { fetchAllProducts } = getProductHelpers();
  const { validaitonOfAllFieldsAreValid, compressedAndCloudinaryUrl } =
    addProductHelpers();
  const allProducts = useSelector(
    (state) => state.store?.allProducts?.products
  );
  const router = useRouter();

  useEffect(() => {
    const prod = allProducts.find((x) => x.id == id);
    setFormData(prod);
  }, [allProducts]);

  const deleteProduct = async () => {
    try {
      const res = await fetch("/api/products/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ product_id: id }),
      });
      if (!res.ok) {
        throw new Error();
      }
      fetchAllProducts();
      toast.success("product deleted sucessfully");
      router.back();
    } catch (error) {
      toast.error("failed to delete product");
    }
  };

  const submitTheForm = async () => {
    const hasError = validaitonOfAllFieldsAreValid(formData);
    if (hasError) {
      toast.error("all fields are required");
      // setError("all fields are required");
      return;
    }
    setLoading((prev) => ({ ...prev, submitLoading: true }));
    try {
      let updatedFormData;
      if (changedImage) {
        const urlToUpload = await compressedAndCloudinaryUrl(hasImage);
        if (!urlToUpload) throw new Error("failed to get url from cloudinary");
        updatedFormData = { ...formData, image_url: urlToUpload || "" };
      } else {
        updatedFormData = { ...formData };
      }
      const res = await fetch("/api/edit-product", {
        method: "PUT",
        body: JSON.stringify(updatedFormData),
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      fetchAllProducts();
      toast.success("Updated product successfully");
      router.push("/");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, submitLoading: false }));
    }
  };
  if (!id) {
    return "something went wrong";
  }
  return (
    <div>
      <BackButton justOneStepBack={"true"} />
      <h2 className="text-center font-medium">Edit product</h2>
      <div className="wrapper max-w-xl mx-auto">
        <EditProduct
          formData={formData}
          setFormData={setFormData}
          deleteProduct={deleteProduct}
          submitTheForm={submitTheForm}
          loading={loading}
          setChangedImage={setChangedImage}
        />
      </div>
    </div>
  );
}

export default page;
