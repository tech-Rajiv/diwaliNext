"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import BannerToShowPrice from "./components/BannerToShowPrice";
import Category from "./components/Category";
import ProductsShowComp from "./components/ProductsShowComp";
import ShowCartWrapper from "./components/ShowCartWrapper";

function page() {
  const { products, loading, error } = useSelector(
    (state) => state.allProducts
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(2);
  const allProducts = products.filter(
    (x) => x.category_id === selectedCategoryId
  );
  const cartItems = useSelector((state) => state.cartProducts.products);

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
      {cartItems.length ? (
        <div className="w-full flex justify-center mx-auto bg-gray-200">
          <div className="flying fixed bottom-10 ">
            <ShowCartWrapper />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default page;
