import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function FormForAddProducts({ handleOnChangeOfInputs, submitTheForm }) {
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
      <div className="btn">
        <Button onClick={submitTheForm}>Add Product</Button>
      </div>
    </div>
  );
}

export default FormForAddProducts;
