import React from "react";

function SingleCategory({ category, setSelectedCategoryId }) {
  const handleChangeSelectedCategory = () => {
    setSelectedCategoryId(category.id);
  };
  return (
    <button
      onClick={handleChangeSelectedCategory}
      className="w-18 h-18 flex justify-center cursor-pointer active:bg-gray-200 rounded-full items-center bg-gray-100"
    >
      {category.name.slice(0, 4)}
    </button>
  );
}

export default SingleCategory;
