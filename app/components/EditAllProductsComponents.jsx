"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import getProductHelpers from "../helper/getProductHelpers";
import SingleEditProductBox from "./uiByMe/SingleEditProductBox";

function EditAllProductsComponents() {
  const { loading, error, products } = useSelector(
    (state) => state.store?.allProducts
  );
  const { fetchAllProducts } = getProductHelpers();
  const [deleting, setDeleting] = useState(false);
  const handleDeleteProduct = async (prod_id) => {
    setDeleting(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({ product_id: prod_id }),
      });
      if (!res.ok) {
        throw new Error();
      }
      toast.success("product deleted successfully");
      fetchAllProducts();
    } catch (error) {
      toast.error("failed to delete a product");
    } finally {
      setDeleting(false);
    }
  };
  if (error) {
    return "error while getting all products";
  }
  return (
    <div className="">
      <div className="wrap flex flex-col gap-2">
        {products?.map((prod) => (
          <SingleEditProductBox prod={prod} key={prod?.id} />
        ))}
      </div>
    </div>
  );
}

export default EditAllProductsComponents;
