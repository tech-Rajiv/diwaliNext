import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import getProductHelpers from "../helper/getProductHelpers";

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
      const data = await res.json();
      toast.success("product deleted successfully");
      fetchAllProducts();
    } catch (error) {
      toast.error("failed to delete a product");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of all products from your shop.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product_Id</TableHead>
            <TableHead>Category_id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Image</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell className="font-medium">{prod.id}</TableCell>
              <TableCell>{prod.category_id}</TableCell>
              <TableCell>{prod.title}</TableCell>
              <TableCell>{prod.price} rs</TableCell>
              <TableCell>{prod.image_url ? "has image" : "no image"}</TableCell>
              <TableCell>
                <button
                  disabled={deleting}
                  onClick={() => handleDeleteProduct(prod.id)}
                >
                  {deleting ? "Deleting" : "Delete"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EditAllProductsComponents;
