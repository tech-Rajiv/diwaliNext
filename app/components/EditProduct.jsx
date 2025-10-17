import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import addProductHelpers from "../helper/addProductHelpers";

function EditProduct({
  formData,
  setFormData,
  deleteProduct,
  submitTheForm,
  setChangedImage,
  loading,
}) {
  const [imgUrl, setImgUrl] = useState();
  const [error, setError] = useState(false);

  const handleOnChangeOfInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError();
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setChangedImage(file);
  };

  return (
    <div className="forms flex flex-col gap-5 p-5 mb-5">
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
        <Label htmlFor="image">Change image :</Label>
        <div className="div flex h-12 gap-5 items-center">
          <img
            src={imgUrl ? imgUrl : formData?.image_url}
            alt=""
            className="w-12 h-full object-cover rounded-md"
          />
          <Input
            id="picture"
            name="image"
            type="file"
            onChange={handleImageSelect}
          />
        </div>
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
        <Label htmlFor="available">Available stock :</Label>
        <Input
          type="number"
          placeholder="available stock"
          value={formData?.available_stock}
          onChange={handleOnChangeOfInputs}
          name="available_stock"
        />
      </div>

      <div className="btn mt-5 flex flex-col gap-3">
        <Button
          className={"w-full"}
          variant={"destructive"}
          disabled={loading?.deleteLoading}
          onClick={deleteProduct}
        >
          {loading?.deleteLoading ? "please wait..." : "Delete product"}
        </Button>
        <Button
          className={"w-full"}
          onClick={submitTheForm}
          disabled={loading?.submitLoading}
        >
          {loading?.submitLoading ? "please wait..." : "Save changes"}
        </Button>
      </div>
      {error && <p className=" text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default EditProduct;
