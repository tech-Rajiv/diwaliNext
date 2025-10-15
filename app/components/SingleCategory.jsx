import React from "react";
import getProductHelpers from "../helper/getProductHelpers";

function SingleCategory({ category }) {
  const { fetchProductsByCategory } = getProductHelpers();
  const handleChangeSelectedCategory = (id) => {
    if (!id) {
      return console.log("no cateid to fetch");
    }
    fetchProductsByCategory(id);
  };
  return (
    <div className="">
      <div
        onClick={() => handleChangeSelectedCategory(category?.id)}
        className={`w-15 h-15 flex justify-center cursor-pointer rounded-lg overflow-hidden items-center bg-gray-100 `}
      >
        {category.image_url && (
          <img
            src={category.image_url}
            className="w-full h-full object-cover"
            alt={category.name}
          />
        )}
      </div>
      <p className={`mt-2 text-center text-xs px-1 `}>
        {category.name.slice(0, 10)}
      </p>
    </div>
  );
}

export default SingleCategory;
