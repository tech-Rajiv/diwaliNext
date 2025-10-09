import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  BadgeCheckIcon,
  ChevronRightIcon,
  Coins,
  CoinsIcon,
  Delete,
  DeleteIcon,
  Trash,
} from "lucide-react";
import React from "react";

function CartLists({ product }) {
  console.log("product: ", product);

  return (
    <div className="mb-2">
      <Item variant="muted" size="sm" asChild>
        <div className="flex gap-5">
          <ItemMedia>{product.quantity}X</ItemMedia>
          <ItemContent>
            <ItemTitle>{product.title}</ItemTitle>
          </ItemContent>
          <ItemActions>{product.price * product.quantity}/-</ItemActions>
          <ItemActions>
            <Trash strokeWidth={1.2} className="size-5" />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
}

export default CartLists;
