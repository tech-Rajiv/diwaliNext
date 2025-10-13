import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Trash } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import addToCartHelpers from "../helper/addToCartHelpers";

function CartLists({ product }) {
  const { justUpdateTheStore } = addToCartHelpers();
  const cartFromTheStore = useSelector((state) => state.cartProducts.products);
  const handleDeleteProductFromCart = (prodId) => {
    const updatedCart = cartFromTheStore.filter((x) => x.product_id !== prodId);
    justUpdateTheStore(updatedCart);
  };
  return (
    <div className="mb-2">
      <Item variant="muted" size="sm" asChild>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded overflow-hidden">
            <Image
              src={product.image_url}
              alt="itemImage"
              height={100}
              width={100}
              className="w-full h-full object-cover"
            />
          </div>
          <ItemContent>
            <ItemTitle className={"text-gray-800"}>
              {product.title} ({product.quantity}x)
            </ItemTitle>
          </ItemContent>
          <ItemActions className={"font-semibold"}>
            {product.sell_price * product.quantity}/-
          </ItemActions>
          <ItemActions>
            <Trash
              strokeWidth={1.2}
              className="size-5 cursor-pointer"
              onClick={() => handleDeleteProductFromCart(product.product_id)}
            />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
}

export default CartLists;
