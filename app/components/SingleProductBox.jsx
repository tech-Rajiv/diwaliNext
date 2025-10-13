import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import addToCartHelpers from "../helper/addToCartHelpers";
import { useRouter } from "next/navigation";

function SingleProductBox({ prod }) {
  const [localQuantiy, setLocalQuantity] = useState(0);
  const overallProductsCart = useSelector((state) => state.cartProducts);
  const { justUpdateTheStore } = addToCartHelpers();
  const router = useRouter();
  const productAlreadyInCart = overallProductsCart.products.find(
    (x) => x.product_id === prod.id
  );

  useEffect(() => {
    overallProductsCart.products.forEach((element) => {
      if (element.product_id === prod.id) {
        setLocalQuantity(element.quantity);
      }
    });
  }, [productAlreadyInCart]);

  const handleBuyProduct = () => {
    const { category_id, id, sell_price, title, image_url } = prod;
    let updateProducts;
    if (productAlreadyInCart) {
      updateProducts = [...overallProductsCart.products].map((x) => {
        if (x.product_id === id) {
          return { ...x, quantity: x.quantity + 1 };
        }
        return x;
      });
    } else {
      updateProducts = [
        ...overallProductsCart.products,
        {
          category_id,
          product_id: id,
          sell_price,
          title,
          quantity: 1,
          image_url,
        },
      ];
    }
    justUpdateTheStore(updateProducts);
    setLocalQuantity((prev) => prev + 1);
  };

  const handleRemoveProduct = () => {
    let updatedProducts;
    if (localQuantiy <= 1) {
      updatedProducts = overallProductsCart.products.filter(
        (x) => x.product_id !== prod.id
      );
    } else {
      updatedProducts = [...overallProductsCart.products].map((x) => {
        if (x.product_id === prod.id) {
          return { ...x, quantity: x.quantity - 1 };
        }
        return x;
      });
    }
    justUpdateTheStore(updatedProducts);
    setLocalQuantity((prev) => prev - 1);
  };

  const handleDynamicRouting = () => {
    router.push(`/products/${prod.id}`);
  };
  return (
    <div className="">
      <div className="img relative w-35 h-40 sm:h-35 bg-gray-100 rounded-lg overflow-hidden">
        {prod.image_url && (
          <img
            onClick={handleDynamicRouting}
            src={prod.image_url}
            className="w-full h-full object-cover cursor-pointer"
            alt={prod?.title}
          />
        )}
        <div className="btn absolute z-5 bottom-1 right-1 overflow-hidden">
          {productAlreadyInCart ? (
            <div className="mt-3 flex items-center justify-between text-[20px]">
              <div className="flex items-center gap-1 bg-white rounded-full p-1">
                <button
                  onClick={handleRemoveProduct}
                  className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  −
                </button>
                <div className="px-1">{localQuantiy}</div>
                <button
                  onClick={handleBuyProduct}
                  className="w-7 h-7 flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              className="cursor-pointer text-[20px] rounded-full font-medium bg-white px-4 py-1"
              onClick={handleBuyProduct}
            >
              Buy
            </button>
          )}
        </div>
      </div>
      <div className="infos text-sm p-1 flex flex-col gap-1 mt-1">
        <p>
          <span className="text-xs">Rs</span>
          <span className="font-semibold text-lg "> {prod?.sell_price}</span>
        </p>
        <h2 className="font-medium">{prod?.title.slice(0, 17)}</h2>
        <p>
          <span className="text-xs">1ps</span>
        </p>
      </div>
    </div>
  );
}

export default SingleProductBox;
