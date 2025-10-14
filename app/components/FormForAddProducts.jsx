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
      }
      const data = await res.json();
      setSelectData(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategoryIdToSendInSelect();
  }, [addedNewCategory]);
  return (
    <div className="forms flex flex-col gap-5 py-5 mb-5">
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="image">Select Catgeory :</Label>
        <SelectCompForCatergory
          handleOnChangeOfInputs={handleOnChangeOfInputs}
          selectData={selectData}
        />
      </div>
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
        <Label htmlFor="image">Image :</Label>

        <Input
          id="picture"
          name="image"
          type="file"
          onChange={handleImageSelect}
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
          value={formData?.sell_price}
          onChange={handleOnChangeOfInputs}
          name="sell_price"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="buyPrice">Buy price :</Label>

        <Input
          type="number"
          id="buyPrice"
          placeholder="buy price"
          value={formData?.buy_price}
          onChange={handleOnChangeOfInputs}
          name="buy_price"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="purchased_from">Purchased from :</Label>

        <Input
          type="text"
          id="purchased_from"
          placeholder="traders name"
          value={formData?.purchased_from}
          onChange={handleOnChangeOfInputs}
          name="purchased_from"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="purchased_box">Purchased box :</Label>

        <Input
          type="number"
          id="purchased_box"
          placeholder="how much bandha"
          value={formData?.purchased_box}
          onChange={handleOnChangeOfInputs}
          name="purchased_box"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="purchased_box">packet per box :</Label>

        <Input
          type="number"
          id="packet_per_box"
          placeholder="how much packets in one bandha"
          value={formData?.packet_per_box}
          onChange={handleOnChangeOfInputs}
          name="packet_per_box"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="purchased_single_packets">Total single packets :</Label>

        <Input
          type="number"
          id="purchased_single_packets"
          placeholder="total how much packets"
          value={formData?.purchased_single_packets}
          onChange={handleOnChangeOfInputs}
          name="purchased_single_packets"
        />
      </div>
      <div className="wrap flex flex-col gap-2">
        <Label htmlFor="purchased_single_packets">Purchase year :</Label>

        <Input
          type="number"
          id="purchased_year"
          placeholder="price"
          value={formData?.purchased_year}
          onChange={handleOnChangeOfInputs}
          name="purchased_year"
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
