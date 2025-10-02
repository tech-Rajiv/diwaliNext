import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import SelectCompForCatergory from "./addproductcomps/SelectCompForCatergory";
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
  }, []);
  return (
    <div className="forms flex flex-col gap-2">
      <Input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleOnChangeOfInputs}
      />

      <Input
        type="text"
        placeholder="description"
        name="description"
        onChange={handleOnChangeOfInputs}
      />
      <Input
        type="number"
        placeholder="price"
        onChange={handleOnChangeOfInputs}
        name="price"
      />
      <Input
        type="number"
        placeholder="available stock"
        onChange={handleOnChangeOfInputs}
        name="available_stock"
      />

      <Input
        id="picture"
        name="image"
        type="file"
        onChange={handleImageSelect}
      />

      <SelectCompForCatergory
        handleOnChangeOfInputs={handleOnChangeOfInputs}
        selectData={selectData}
      />

      <div className="btn">
        <Button onClick={submitTheForm} disabled={loading}>
          {loading ? "please wait..." : "Add product"}
        </Button>
      </div>
      {error && <p className=" text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default FormForAddProducts;
