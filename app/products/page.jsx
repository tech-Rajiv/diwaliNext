"use client";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import ProductsShowComp from "../components/ProductsShowComp";
import BannerToShowPrice from "../components/BannerToShowPrice";
import ShowCartItems from "../components/ShowCartItems";
import ShowCartWrapper from "../components/ShowCartWrapper";

function page() {
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(2);

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
    <div className="flex flex-col gap-5 relative">
      <BannerToShowPrice />
      <div className="conatiner px-5 mt-5">
        <Category
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
      <ProductsShowComp
        error={error}
        loading={loading}
        allProducts={allProducts}
      />
      <div className="w-full flex justify-center mx-auto bg-gray-200">
        <div className="flying fixed bottom-10 ">
          <ShowCartWrapper />
        </div>
      </div>
      {/* <ShowCartItems /> */}
    </div>
  );
}

export default page;
