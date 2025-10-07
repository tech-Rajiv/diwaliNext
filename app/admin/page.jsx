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
function page() {
  const router = useRouter();
  return (
    <div className="flex justify-center w-full">
      <Tabs defaultValue="account" className="mt-5 w-full flex flex-col gap-10">
        <TabsList className="flex max-w-2xl mx-auto">
          <TabsTrigger value="add-category">Add category</TabsTrigger>
          <TabsTrigger value="add-product">Add product</TabsTrigger>
          <TabsTrigger value="edit-product">Edit products</TabsTrigger>
        </TabsList>
        <TabsContent value="add-category">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="add-product" className="max-w-3xl mx-auto">
          <AddProductComp />
        </TabsContent>
        <TabsContent value="edit-product">
          <EditAllProductsComponents />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
