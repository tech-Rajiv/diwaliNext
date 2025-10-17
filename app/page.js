"use client";

import { useSelector } from "react-redux";
import BannerToShowPrice from "./components/BannerToShowPrice";
import Category from "./components/Category";
import ProductsShowComp from "./components/ProductsShowComp";
import ShowCartWrapper from "./components/ShowCartWrapper";
import { useRouter } from "next/navigation";

function page() {
  const cartItems = useSelector((state) => state.cartProducts.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  // if (!isLoggedIn) {
  //   router.replace("/login");
  // }
  return (
    <div className="flex flex-col gap-5 relative">
      <BannerToShowPrice />
      <div className="conatiner px-5 mt-5">
        <Category />
      </div>
      <ProductsShowComp />
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
