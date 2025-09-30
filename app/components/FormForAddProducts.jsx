import React from "react";

function FormForAddProducts({ handleOnChangeOfInputs, submitTheForm }) {
  return (
    <div className="forms flex flex-col gap-2">
      <input
        type="text"
        placeholder="title"
        className="border p-2 rounded"
        name="title"
        onChange={handleOnChangeOfInputs}
      />
      <input
        type="text"
        placeholder="description"
        className="border p-2 rounded"
        name="description"
        onChange={handleOnChangeOfInputs}
      />
      <input
        type="number"
        placeholder="price"
        className="border p-2 rounded"
        onChange={handleOnChangeOfInputs}
        name="price"
      />
      <input
        type="number"
        placeholder="available stock"
        className="border p-2 rounded"
        onChange={handleOnChangeOfInputs}
        name="available_stock"
      />
      <div className="btn">
        <button className="btnPrimary" onClick={submitTheForm}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default FormForAddProducts;
