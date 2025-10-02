import React from "react";

function SingleCategory({
  category,
  setSelectedCategoryId,
  selectedCategoryId,
}) {
  const handleChangeSelectedCategory = () => {
    setSelectedCategoryId(category.id);
  };
  return (
    <div className="">
      <button
        onClick={handleChangeSelectedCategory}
        className={`w-15 h-15 flex justify-center cursor-pointer  rounded-lg items-center bg-gray-100`}
      ></button>
      <p
        className={`mt-2 text-center text-xs px-1 ${
          selectedCategoryId === category.id ? "" : "text-gray-400"
        }`}
      >
        {category.name.slice(0, 10)}
      </p>
    </div>
  );
}

export default SingleCategory;
