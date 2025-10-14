import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/slices/cartProductSlice";

function addToCartHelpers() {
  const dispatch = useDispatch();
  const justUpdateTheStore = (updatedCart) => {
    const updateProductsQuantity = updatedCart.length;
    const updatedTotalPrice = getTotalPrice(updatedCart);
    const updatedTotalproductsQuantity = getTotalQuantity(updatedCart);
    dispatch(
      addProductToCart({
        products: updatedCart,
        products_quantity: updateProductsQuantity,
        total_price: updatedTotalPrice,
        total_products_quantity: updatedTotalproductsQuantity,
      })
    );
  };
  const getTotalPrice = (array) => {
    let total = 0;
    array.forEach((x) => {
      total += (x.sell_price || 0) * (x.quantity || 0);
    });
    return total;
  };
  const getTotalQuantity = (array) => {
    let quantity = 0;
    array.forEach((x) => {
      quantity += x.quantity;
    });
    return quantity;
  };
  return {
    justUpdateTheStore,
  };
}

export default addToCartHelpers;
