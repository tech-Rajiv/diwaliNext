"use client";
import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import BackButton from "../components/uiByMe/BackButton";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProductComp from "../components/addproductcomps/AddProductComp";
import EditAllProductsComponents from "../components/EditAllProductsComponents";
import SingleOutlineList from "../components/uiByMe/SingleOutlineList";
function page() {
  const router = useRouter();
  return (
    <div className="px-5 max-w-xl mx-auto">
      <h2 className="font-medium mt-5">Select what you want to do</h2>
      <div className="flex flex-col gap-3 mt-5">
        <SingleOutlineList name={"Add Category"} url={"add-new-category"} />
        <SingleOutlineList name={"Add new product"} url={"add-new-product"} />
        <SingleOutlineList name={"Edit products"} url={"edit-products"} />
      </div>
    </div>
  );
}

export default page;
