"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import getProductHelpers from "../helper/getProductHelpers";
import { Button } from "@/components/ui/button";
import TableRowCustom from "./uiByMe/TableRowCustom";

function EditAllProductsComponents() {
  const { loading, error, products } = useSelector(
    (state) => state.allProducts
  );
  const { fetchAllProducts } = getProductHelpers();
  const [deleting, setDeleting] = useState(false);
  const handleDeleteProduct = async (prod_id) => {
    setDeleting(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({ product_id: prod_id }),
      });
      if (!res.ok) {
        throw new Error();
      }
      toast.success("product deleted successfully");
      fetchAllProducts();
    } catch (error) {
      toast.error("failed to delete a product");
    } finally {
      setDeleting(false);
    }
  };
  if (error) {
    return "error while getting all products";
  }
  return (
    <div className="px-5">
      <h2 className="font-medium text-center">All products</h2>
      <Table className={""}>
        <TableCaption>A list of all products from your shop.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((prod) => (
            <TableRowCustom prod={prod} key={prod?.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EditAllProductsComponents;
