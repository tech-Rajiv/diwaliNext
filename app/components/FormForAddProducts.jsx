import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import SelectCompForCatergory from "./addproductcomps/SelectCompForCatergory";
import { Label } from "@/components/ui/label";
import DialogBox from "./DialogBox";
import DialogBoxWithInput from "./addproductcomps/DialogBoxWithInput";
import { toast } from "sonner";

function FormForAddProducts({
  formData,
  handleImageSelect,
  handleOnChangeOfInputs,
  submitTheForm,
  loading,
  error,
}) {
  const [selectData, setSelectData] = useState([]);
  const [addedNewCategory, setAddedNewCategory] = useState(false);
  const getAllCategoryIdToSendInSelect = async () => {
    try {
      const res = await fetch("/api/addproduct/getcategoriesarray");
      if (!res.ok) {
        console.log("error while getting all categories");
      }
      const data = await res.json();
      setSelectData(data?.data);
    } catch (error) {
      console.log("hadd catch error");
    }
  };

  const createNewCategory = async (newCategory, setLoading) => {
    console.log("(newCategory: ", newCategory);

    try {
      const res = await fetch("/api/category/new-category", {
        method: "POST",
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) {
        throw new Error();
      }
      console.log(res, "ressss");
      toast.success("Category added successfully");
      setAddedNewCategory((prev) => !prev);
    } catch (error) {
      toast.error("failed to new category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategoryIdToSendInSelect();
  }, [addedNewCategory]);
  return (
    <div className="forms flex flex-col gap-2">
      <Input
        type="text"
        placeholder="title"
        name="title"
        value={formData.title}
        onChange={handleOnChangeOfInputs}
      />

      <Input
        type="text"
        placeholder="description"
        name="description"
        value={formData.description}
        onChange={handleOnChangeOfInputs}
      />
      <Input
        type="number"
        placeholder="price"
        value={formData.price}
        onChange={handleOnChangeOfInputs}
        name="price"
      />
      <Input
        type="number"
        placeholder="available stock"
        value={formData.available_stock}
        onChange={handleOnChangeOfInputs}
        name="available_stock"
      />

      <Input
        id="picture"
        name="image"
        type="file"
        onChange={handleImageSelect}
      />
      <div className="category flex  flex-col sm:flex-row  justify-between gap-5 sm:gap-2">
        <SelectCompForCatergory
          handleOnChangeOfInputs={handleOnChangeOfInputs}
          selectData={selectData}
        />
        <div className="addNewCategory flex flex-col sm:flex-row items-center gap-2">
          <p className="text-sm">missing category?</p>
          <div className="add outline px-2 rounded-md py-1">
            <DialogBoxWithInput
              name={"Add new category"}
              heading={"Add new category"}
              onClickYesFn={createNewCategory}
              content={
                "once you add category it will be shown and can add products to this new create category"
              }
            />
          </div>
        </div>
      </div>

      <div className="btn mt-5">
        <Button onClick={submitTheForm} disabled={loading}>
          {loading ? "please wait..." : "Add product"}
        </Button>
      </div>
      {error && <p className=" text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default FormForAddProducts;
