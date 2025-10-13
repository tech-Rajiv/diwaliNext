import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import SelectCompForCatergory from "./addproductcomps/SelectCompForCatergory";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

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

  useEffect(() => {
    getAllCategoryIdToSendInSelect();
  }, [addedNewCategory]);
  return (
    <div className="forms flex flex-col gap-5 py-5">
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="title">Product name :</Label>
        <Input
          type="text"
          id="title"
          placeholder="title"
          name="title"
          value={formData?.title}
          onChange={handleOnChangeOfInputs}
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="description">Description :</Label>
        <Input
          type="text"
          id="description"
          placeholder="description"
          name="description"
          value={formData?.description}
          onChange={handleOnChangeOfInputs}
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="sellPrice">Sell price :</Label>

        <Input
          type="number"
          id="sellPrice"
          placeholder="price"
          value={formData?.price}
          onChange={handleOnChangeOfInputs}
          name="price"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="buyPrice">Buy price :</Label>

        <Input
          type="number"
          id="buyPrice"
          placeholder="price"
          value={formData?.buy_price}
          onChange={handleOnChangeOfInputs}
          name="buyPrice"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="available">Available stock :</Label>

        <Input
          type="number"
          placeholder="available stock"
          value={formData.available_stock}
          onChange={handleOnChangeOfInputs}
          name="available_stock"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="image">Image :</Label>

        <Input
          id="picture"
          name="image"
          type="file"
          onChange={handleImageSelect}
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="image">Select Catgeory :</Label>
        <SelectCompForCatergory
          handleOnChangeOfInputs={handleOnChangeOfInputs}
          selectData={selectData}
        />
      </div>

      {/* <div className="category flex  flex-col sm:flex-row  justify-between gap-5 sm:gap-2"></div> */}

      <div className="btn mt-5 flex ">
        <Button className={"w-full"} onClick={submitTheForm} disabled={loading}>
          {loading ? "please wait..." : "Add product"}
        </Button>
      </div>
      {error && <p className=" text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default FormForAddProducts;
