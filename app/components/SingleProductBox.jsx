import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../store/slices/addProductSlice";

function SingleProductBox({ prod }) {
  const [added, setAdded] = useState(false);
  const [localQuantiy, setLocalQuantity] = useState(0);
  const dispatch = useDispatch();

  const overallProductsCart = useSelector((state) => state.addProducts);
  const productAlreadyInCart = overallProductsCart.products.find(
    (x) => x.product_id === prod.id
  );

  useEffect(() => {
    overallProductsCart.products.forEach((element) => {
      if (element.product_id === prod.id) {
        setLocalQuantity(element.quanity);
      }
    });
  }, [productAlreadyInCart]);

  const handleBuyProduct = () => {
    const { category_id, id, price, title } = prod;
    let updateProducts;
    if (productAlreadyInCart) {
      updateProducts = [...overallProductsCart.products].map((x) => {
        if (x.product_id === id) {
          return { ...x, quanity: x.quanity + 1 };
        }
        return x;
      });
    } else {
      updateProducts = [
        ...overallProductsCart.products,
        { category_id, product_id: id, price, title, quanity: 1 },
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
          return { ...x, quanity: x.quanity - 1 };
        }
        return x;
      });
    }
    justUpdateTheStore(updatedProducts);
    setLocalQuantity((prev) => prev - 1);
  };

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
    console.log(array, "arr");
    let total = 0;
    array.forEach((x) => {
      total += (x.price || 0) * (x.quanity || 0);
    });
    return total;
  };
  const getTotalQuantity = (array) => {
    let quantity = 0;
    array.forEach((x) => {
      quantity += x.quanity;
    });
    return quantity;
  };
  return (
    <div className="">
      <div className="img relative w-35 h-35 bg-gray-100 rounded-lg overflow-hidden">
        {prod.image_url && (
          <img
            src={prod.image_url}
            className="w-full h-full object-cover"
            alt={prod?.title}
          />
        )}
        <div className="btn absolute z-5 bottom-1 right-1 overflow-hidden">
          {productAlreadyInCart ? (
            <div className="flex gap-1">
              <button
                className=" bg-white px-2 rounded cursor-pointer"
                onClick={handleRemoveProduct}
              >
                -
              </button>
              <div className=" bg-white px-2  font-medium  rounded">
                {localQuantiy}
              </div>
              <button
                className=" bg-white px-2 rounded cursor-pointer"
                onClick={handleBuyProduct}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer rounded-md font-medium bg-white px-2 "
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
          <span className="font-medium"> {prod?.price}</span>
        </p>
        <h2 className="">{prod?.title.slice(0, 17)}</h2>
        <p>
          <span className="text-xs">1ps</span>
        </p>
      </div>
    </div>
  );
}

export default SingleProductBox;
