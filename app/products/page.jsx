"use client";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import ProductsShowComp from "../components/ProductsShowComp";

function page() {
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const fetchAllProducts = async (categoryId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category_id=${categoryId}`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts(selectedCategoryId);
  }, [selectedCategoryId]);
  return (
    <div className="flex flex-col gap-8 px-5">
      <Category
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <ProductsShowComp
        error={error}
        loading={loading}
        allProducts={allProducts}
      />
    </div>
  );
}

export default page;
