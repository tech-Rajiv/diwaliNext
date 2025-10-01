import React, { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";

function Category({ selectedCategoryId, setSelectedCategoryId }) {
  const [allCategories, setAllCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllCategories = async () => {
    try {
      const res = await fetch("/api/category");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setAllCategories(data);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllCategories();
  }, []);

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>Category</h2>
      <div className="all flex gap-5 mt-5">
        {allCategories?.map((category, index) => (
          <div>
            <SingleCategory
              key={index}
              category={category}
              setSelectedCategoryId={setSelectedCategoryId}
            />
            <div
              className={`${
                selectedCategoryId == category.id ? "" : "hidden"
              } w-full h-[1px] shadow bg-black/40 mt-5`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
