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
} from "lucide-react";
import React from "react";

function CartLists({ product }) {
  console.log("product: ", product);

  return (
    <div>
      <Item variant="muted" size="sm" asChild>
        <div>
          <ItemMedia>{product.quantity}X</ItemMedia>
          <ItemContent>
            <ItemTitle>{product.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
            {product.price * product.quantity}
            <CoinsIcon className="size-4" />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
}

export default CartLists;
